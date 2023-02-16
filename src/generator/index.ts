import fs from 'fs';

import { glob } from 'glob';
import { OpenAPIV3 } from 'openapi-types';
import * as ts from 'typescript';
import * as TJS from 'typescript-json-schema';

import { Tspec } from '../types/tspec';
import { assertIsDefined, isDefined } from '../utils/types';

import * as c from './converter';
import * as ob from './openApiBuilder';
import { oapiSchema } from './utils';

const getCompilerOptions = (tsconfigPath: string) => {
  const { config, error } = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  if (error) {
    throw new Error(error.messageText as string);
  }
  return config.compilerOptions;
};

const getProgramFiles = (
  compilerOptions: ts.CompilerOptions,
  specPathGlobs: string[],
) => {
  const typeFiles = [
    ...(compilerOptions.typeRoots || []),
    compilerOptions.baseUrl,
  ].flatMap((typeRoot) => glob.sync(`${typeRoot}/**/*.d.ts`));
  const specFiles = specPathGlobs.flatMap((specPathGlob) => glob.sync(specPathGlob));
  return [...typeFiles, ...specFiles];
};

const isNodeExported = (node: ts.Node): boolean =>
  // eslint-disable-next-line no-bitwise
  (ts.getCombinedModifierFlags(node as ts.Declaration)
    & ts.ModifierFlags.Export)
    !== 0
  || (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile);

const getTspecSignatures = (p: ts.Program) => {
  const entryPoints = p
    .getRootFileNames()
    .map((entryPointName) => p.getSourceFile(entryPointName))
    .filter(isDefined);

  const names: string[] = [];
  entryPoints.forEach((srcFile) => {
    ts.forEachChild(srcFile, (node) => {
      if (!isNodeExported(node)) {
        return;
      }

      if (
        !ts.isTypeAliasDeclaration(node)
        || !ts.isTypeReferenceNode(node.type)
      ) {
        return;
      }

      if (
        (node.type?.typeName as any)?.right?.escapedText !== 'RegisterApiSpec'
      ) {
        return;
      }
      const name = node.name.escapedText as string;
      if (names.includes(name)) {
        throw new Error(`Duplicate name: ${name}`);
      }
      names.push(name);
    });
  });

  return names;
};

const getOpenapiSchemas = async (
  tsconfigPath = 'tsconfig.json',
  specPathGlobs: string[],
) => {
  const compilerOptions = getCompilerOptions(tsconfigPath);
  const files = getProgramFiles(compilerOptions, specPathGlobs);

  const settings: TJS.PartialArgs = {
    required: true,
    noExtraProps: true,
    strictNullChecks: true,
    // rejectDateType: true,
  };
  const program = TJS.getProgramFromFiles(files, compilerOptions);
  const generator = TJS.buildGenerator(program, settings);
  assertIsDefined(generator);

  const tspecSymbols = getTspecSignatures(program as ts.Program);
  const { definitions: jsonSchemas } = generator.getSchemaForSymbols(tspecSymbols);

  assertIsDefined(jsonSchemas);

  const openapiSchemas = await getSchemaMap(jsonSchemas);

  return { openapiSchemas, tspecSymbols };
};

export const generateTspec = async (
  params: Tspec.GenerateParams,
): Promise<OpenAPIV3.Document> => {
  const { openapiSchemas: openapiSchemaMap, tspecSymbols } = await getOpenapiSchemas(params.tsconfigPath, params.specPathGlobs);

  const openapi = await buildOpenApi(openapiSchemaMap, tspecSymbols);

  // params 정보 입력
  openapi.openapi = (params.specVersion === 3 && '3.0.3') || '3.0.3';
  if (params.openapi?.securityDefinitions) {
    if (!openapi.components) {
      openapi.components = {};
    }
    openapi.components!.securitySchemes = params.openapi?.securityDefinitions;
  }
  if (params.openapi?.servers) {
    openapi.servers = params.openapi?.servers;
  }

  if (params.outputPath) {
    fs.writeFileSync(params.outputPath, JSON.stringify(openapi, null, 2));
  }

  return openapi;
};

const getSchemaMap = async (
  def: {[key:string]: TJS.DefinitionOrBoolean},
): Promise<Map<string, oapiSchema>> => {
  const schemaMap: Map<string, oapiSchema> = new Map();

  for (const [key, val] of Object.entries(def)) {
    if (!val) {
      continue;
    }
    const convertedProperty = await c.convertDefinition(val);
    if (convertedProperty) {
      schemaMap.set(key.replace(/[^A-Za-z0-9_.-]/g, '_'), convertedProperty);
    }
  }

  return schemaMap;
};

const buildOpenApi = async (
  sMap: Map<string, oapiSchema>,
  routerNames: string[],
) => {
  const routerMap = new Map<string, oapiSchema>();
  routerNames.forEach((routerName) => {
    const routerSchema = sMap.get(routerName);
    if (routerSchema) routerMap.set(routerName, routerSchema);
    sMap.delete(routerName);
  });

  const openapi = await ob.buildOpenApiDocument(routerMap);
  openapi.components = await ob.buildComponentsObject(sMap);

  return openapi;
};

/**
 * 제대로 동작하지 않는 케이스 (테스트 케이스)
 * 1. Partial of Record
 * export type BlockRegions = Partial<Record<'es' | 'en', { blockAt: string }>>;
 */
