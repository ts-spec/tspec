import fs from 'fs';
import { OpenAPIV3 } from 'openapi-types';
import path from 'path';
import * as ts from 'typescript';
import { buildGenerator, Definition } from 'typescript-json-schema';
import { stringify } from 'yaml';

import * as c from './converter';
import * as ob from './openApiBuilder';
import { isConcrete, oapiSchema } from './utils';

const projectPath = '/Users/yeji/ridi/backends/';

// 제거
const getProgram = async (projectPath: string) => {
  const config = ts.readJsonConfigFile(
    path.resolve(projectPath, 'tsconfig.json'),
    ts.sys.readFile,
  );

  const parsedConfigContents = ts.parseJsonSourceFileConfigFileContent(
    config,
    ts.sys,
    path.resolve(projectPath),
    {},
    path.resolve(projectPath, 'tsconfig.json'),
  );

  const compilerHost = ts.createCompilerHost(parsedConfigContents.options);
  if (!compilerHost) {
    throw Error('Failed to create compiler host');
  }
  const program = ts.createProgram({
    rootNames: parsedConfigContents.fileNames,
    options: parsedConfigContents.options,
    host: compilerHost,
  });

  if (!program) {
    throw Error('Failed to create program');
  }
  return program;
};

// 제거
const findTspecSymbolNames = async (program: ts.Program) => {
  const typeChecker = program.getTypeChecker();

  const sourceFiles = program.getSourceFiles();

  const tspecSymbolNames: string[] = sourceFiles
    .filter((file) => file.fileName.endsWith('.tspec.ts'))
    .flatMap((file) => {
      const symbol = typeChecker.getSymbolAtLocation(file);
      const exports = symbol?.exports;
      const tspecSymbolNames: string[] = [];

      exports?.forEach((val, key) => {
        //val.parent가 tspec인지 확인?
        tspecSymbolNames.push(key.toString());
      });

      return tspecSymbolNames;
    });

  return tspecSymbolNames;
};

// 제거
const buildJsonSchemaGenerator = async (program: ts.Program) => {
  const generator = await buildGenerator(program, {});
  if (!generator) {
    throw Error('Failed to build JsonSchemaGenerator');
  }

  return generator;
};

// 제거
const prebuild = async () => {
  const program = await getProgram(projectPath);
  const generator = await buildJsonSchemaGenerator(program);
  const tspecSymbolNames = await findTspecSymbolNames(program);
  const schemas = generator.getSchemaForSymbols(tspecSymbolNames, true);
  return schemas;
};

const getSchemaMap = async (
  def: Definition,
): Promise<Map<string, oapiSchema>> => {
  const schemaMap: Map<string, oapiSchema> = new Map();

  console.log(JSON.stringify(def.definitions)); // 여러 symbol을 한번에 찾으면 schema가 모두 definitions에 들어감
  if (def.definitions) {
    for (const [key, val] of Object.entries(def.definitions)) {
      if (!val) {
        continue;
      }
      const convertedProperty = await c.convertDefinition(val);
      if (convertedProperty) {
        schemaMap.set(key, convertedProperty);
      }
    }
  }

  return schemaMap;
};

const write = async (openapi: OpenAPIV3.Document) => {
  fs.writeFileSync('./output/openapi.yaml', stringify(openapi));
};

const buildOpenApi = async (
  sMap: Map<string, oapiSchema>,
  routerNames: string[],
) => {
  const routers = routerNames.map((name) => sMap.get(name)).filter(isConcrete);
  const openapi = await ob.buildOpenApiDocument(routers);

  for await (const routerName of routerNames) {
    // Router schema는 제거
    sMap.delete(routerName);
  }
  openapi['components'] = await ob.buildComponentsObject(sMap);

  await write(openapi);
};

prebuild().then(async (schema) => {
  const schemaMap = await getSchemaMap(schema);
  await buildOpenApi(schemaMap, ['SeriesRouter1', 'SeriesRouter2']);
});
