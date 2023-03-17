import fs from 'fs/promises';
import { dirname } from 'path';

import debug from 'debug';
import { glob } from 'glob';
import { OpenAPIV3 } from 'openapi-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import ts from 'typescript';
import * as TJS from 'typescript-json-schema';

import { Tspec } from 'types/tspec';
import { assertIsDefined, isDefined } from 'utils/types';

import { getOpenapiPaths } from './openapiGenerator';
import { convertToOpenapiSchemas } from './openapiShcmeaConverter';
import { SchemaMapping } from './types';

export const DEBUG = debug('tspec');

const isNodeExported = (node: ts.Node): boolean => (
  // eslint-disable-next-line no-bitwise
  (ts.getCombinedModifierFlags(node as ts.Declaration) & ts.ModifierFlags.Export) !== 0
  || (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
);

const getTspecSignatures = (p: ts.Program) => {
  const entryPoints = p
    .getRootFileNames()
    .map((entryPointName) => p.getSourceFile(entryPointName)).filter(isDefined);

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

      if ((node.type?.typeName as any)?.right?.escapedText !== 'DefineApiSpec') {
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

const getCompilerOptions = (tsconfigPath: string): ts.CompilerOptions => {
  const { config, error } = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  if (error) {
    throw new Error(error.messageText as string);
  }
  return {
    ...config.compilerOptions,
    noEmit: true,
  };
};

const getDefaultProgramFiles = (compilerOptions: ts.CompilerOptions) => {
  const { rootDir, rootDirs } = compilerOptions;
  return [rootDir, ...(rootDirs || [])].filter(isDefined).map((r) => `${r}/**/*.ts`);
};

const getProgramFiles = (compilerOptions: ts.CompilerOptions, specPathGlobs?: string[]) => {
  const srcGlobs = specPathGlobs || getDefaultProgramFiles(compilerOptions);
  return srcGlobs.flatMap((g) => glob.sync(g));
};

/**
 * 제대로 동작하지 않는 케이스..?
 * 1. Partial of Record
 * export type BlockRegions = Partial<Record<'es' | 'en', { blockAt: string }>>;
 */
const getOpenapiSchemas = async (tsconfigPath: string, specPathGlobs?: string[]) => {
  const compilerOptions = getCompilerOptions(tsconfigPath);
  const files = getProgramFiles(compilerOptions, specPathGlobs);
  const program = TJS.getProgramFromFiles(files, compilerOptions);

  const settings: TJS.PartialArgs = {
    required: true,
    noExtraProps: true,
    strictNullChecks: true,
    ignoreErrors: true,
    // rejectDateType: true,
  };
  const generator = TJS.buildGenerator(program, settings);
  assertIsDefined(generator);

  const tspecSymbols = getTspecSignatures(program as ts.Program);
  DEBUG({ tspecSymbols });
  const { definitions: jsonSchemas } = generator.getSchemaForSymbols(tspecSymbols);
  assertIsDefined(jsonSchemas);
  DEBUG({ schemaKeys: Object.keys(jsonSchemas) });

  const openapiSchemas = await convertToOpenapiSchemas(jsonSchemas);

  return { openapiSchemas, tspecSymbols };
};

const getOpenapiSchemasOnly = (openapiSchemas: SchemaMapping, tspecSymbols: string[]) => {
  const tspecPathSchemas = tspecSymbols.flatMap((tspecSymbol) => {
    const paths = openapiSchemas[tspecSymbol].properties || {};
    DEBUG({ tspecSymbol, paths });
    return Object.keys(paths).map((path) => {
      const obj = paths[path];
      if ('$ref' in obj) {
        const [, schemaName] = obj.$ref.split('#/components/schemas/');
        return schemaName;
      }
      return undefined;
    });
  });

  return Object.fromEntries(
    Object.entries(openapiSchemas).filter(
      ([key]) => (!tspecSymbols.includes(key) && !tspecPathSchemas.includes(key)),
    ),
  );
};

export const generateTspec = async (
  params: Tspec.GenerateParams = {},
): Promise<OpenAPIV3.Document> => {
  const {
    openapiSchemas, tspecSymbols,
  } = await getOpenapiSchemas(
    params.tsconfigPath || 'tsconfig.json',
    params.specPathGlobs,
  );

  const paths = getOpenapiPaths(openapiSchemas, tspecSymbols);
  const schemas = getOpenapiSchemasOnly(openapiSchemas, tspecSymbols);

  const openapi: OpenAPIV3.Document = {
    info: {
      title: params.openapi?.title || 'Tspec API',
      version: params.openapi?.version || '0.0.1',
    },
    openapi: (params.specVersion === 3 && '3.0.3') || '3.0.3',
    paths,
    components: {
      schemas,
      securitySchemes: params.openapi?.securityDefinitions,
    },
    servers: params.openapi?.servers,
  };

  if (params.outputPath) {
    await fs.mkdir(dirname(params.outputPath), { recursive: true });
    await fs.writeFile(params.outputPath, JSON.stringify(openapi, null, 2));
  }

  return openapi;
};
