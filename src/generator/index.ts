import fs from 'fs';

import debug from 'debug';
import { glob } from 'glob';
import convert from 'json-schema-to-openapi-schema'; // TODO: 이게 정말 필요한건지 체크 필요.
import { OpenAPIV3 } from 'openapi-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import ts from 'typescript';
import * as TJS from 'typescript-json-schema';

import { Tspec } from 'types/tspec';
import { assertIsDefined, isDefined } from 'utils/types';

type SchemaMapping = Record<string, OpenAPIV3.SchemaObject>;

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

      if ((node.type?.typeName as any)?.right?.escapedText !== 'RegisterApiSpec') {
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

const getPathOrQueryParams = (properties: any, inType: 'query' | 'path') => {
  if (!properties) {
    return undefined;
  }
  return Object.entries(properties).map(([key, schema]) => {
    const {
      description, required, examples, ...rest
    } = schema as TJS.Definition;
    return {
      description,
      name: key,
      in: inType,
      required: inType === 'path' ? true : required ?? false,
      schema: rest,
      example: Array.isArray(examples) ? examples[0] : examples, // FIXME: tjs does not support example.
    };
  });
};

const resolveParameters = (path: any, query: any) => {
  const pathParams = (path && getPathOrQueryParams(path, 'path')) || [];
  const queryParams = (query && getPathOrQueryParams(query, 'query')) || [];
  return [...pathParams, ...queryParams];
};

const findAllRefAndReplace = (schema: any, nameMapping: any): any => { // TODO: fix types
  if (Array.isArray(schema)) {
    return schema.map((s) => findAllRefAndReplace(s, nameMapping));
  }
  if (schema && typeof schema === 'object') {
    if (schema.$ref) {
      const [, schemaName] = schema.$ref.split('#/definitions/');
      return {
        ...schema,
        $ref: `#/components/schemas/${nameMapping[schemaName]}`,
      };
    }
    return Object.fromEntries(
      Object.entries(schema).map(([key, value]) => [key, findAllRefAndReplace(value, nameMapping)]),
    );
  }
  return schema;
};

const convertTypeArrayAndNullable = (schema: any): any => { // TODO: fix types
  if (Array.isArray(schema)) {
    return schema.map((s) => convertTypeArrayAndNullable(s));
  }
  if (schema && typeof schema === 'object') {
    if (schema.type && !Array.isArray(schema.type) && schema.type === 'null') {
      return {
        ...schema,
        type: undefined,
        nullable: true,
      };
    }
    if (schema.type && Array.isArray(schema.type) && schema.type.length > 1) {
      const nullable = schema.type.includes('null');
      const types = schema.type.filter((type: any) => type !== 'null');
      if (types.length === 1) {
        return {
          ...schema,
          type: types[0],
          nullable,
        };
      }
      return {
        ...schema,
        type: undefined,
        oneOf: schema.type
          .filter((type: any) => type !== 'null')
          .map((type: any) => ({ ...schema, type })),
        nullable,
      };
    }
    return Object.fromEntries(
      Object.entries(schema).map(([key, value]) => [key, convertTypeArrayAndNullable(value)]),
    );
  }
  return schema;
};

const getCompilerOptions = (tsconfigPath: string) => {
  const { config, error } = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  if (error) {
    throw new Error(error.messageText as string);
  }
  return config.compilerOptions;
};

const getProgramFiles = (compilerOptions: ts.CompilerOptions, specPathGlobs: string[]) => {
  const typeFiles = [...(compilerOptions.typeRoots || []), compilerOptions.baseUrl]
    .flatMap((typeRoot) => glob.sync(`${typeRoot}/**/*.d.ts`));
  const specFiles = specPathGlobs.flatMap((specPathGlob) => glob.sync(specPathGlob));
  return [...typeFiles, ...specFiles];
};

const escapeSchemaNames = (schemas: SchemaMapping) => {
  const escapedNameMapping = Object.fromEntries(Object.keys(schemas).map((schemaName) => (
    // only contain the characters A-Z a-z 0-9 - . _
    [schemaName, schemaName.replace(/[^A-Za-z0-9_.-]/g, '_')]
  )));
  const escapedSchemas = Object.fromEntries(Object.entries(schemas).map(([schemaName, schema]) => (
    [escapedNameMapping[schemaName], schema]
  )));
  // eslint-disable-next-line max-len
  return findAllRefAndReplace(escapedSchemas, escapedNameMapping) as SchemaMapping; // TODO: fix types
};

const convertToOpenapiSchemas = async (
  jsonSchemas: TJS.Definition,
): Promise<SchemaMapping> => {
  const convertedJsonSchemas = convertTypeArrayAndNullable(jsonSchemas);
  const openapiSchemas = await convert(convertedJsonSchemas) as SchemaMapping;
  return escapeSchemaNames(openapiSchemas);
};

const getOpenapiSchemas = async (tsconfigPath: string, specPathGlobs: string[]) => {
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
  DEBUG({ tspecSymbols });
  const { definitions: jsonSchemas } = generator.getSchemaForSymbols(tspecSymbols);
  assertIsDefined(jsonSchemas);
  DEBUG({ schemaKeys: Object.keys(jsonSchemas) });

  const openapiSchemas = await convertToOpenapiSchemas(jsonSchemas);

  return { openapiSchemas, tspecSymbols };
};

type Schema = OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject;

const accessProperty = (
  obj: Schema | undefined,
  key: string,
  schemas: SchemaMapping,
): Schema | undefined => {
  if (!obj) {
    return undefined;
  }
  if ('$ref' in obj) {
    const [, schemaName] = obj.$ref.split('#/components/schemas/');
    return accessProperty(schemas[schemaName], key, schemas);
  }
  const combinedSchema = obj.allOf || obj.oneOf || obj.anyOf;
  if (combinedSchema) {
    return combinedSchema.map((o) => accessProperty(o, key, schemas)).find((o) => o);
  }
  return obj.properties && obj.properties[key];
};

const getPropertyByPath = (
  obj: Schema | undefined,
  path: string,
  schemas: SchemaMapping,
): Schema | undefined => {
  const [first, ...rest] = path.split('.');
  const firstValue = accessProperty(obj, first, schemas);
  if (rest.length === 0) {
    return firstValue;
  }
  return getPropertyByPath(firstValue, rest.join('.'), schemas);
};

const getText = (obj: Schema | undefined): string | undefined => {
  if (!obj || '$ref' in obj || obj.type !== 'string' || obj.enum?.length !== 1) {
    return undefined;
  }
  return obj.enum[0];
};

const getTextPropertyByPath = <O extends { required: boolean }>(
  obj: Schema, path: string, schemas: SchemaMapping, options?: O,
): O extends { required: true } ? string : string | undefined => {
  const text = getText(getPropertyByPath(obj, path, schemas));
  if (options?.required === true && !text) {
    throw new Error(`Invalid '${path}' in ApiSpec`);
  }
  return text as string;
};

const getTextListPropertyByPath = (
  obj: Schema,
  path: string,
  schemas: SchemaMapping,
  options?: { required: boolean },
): string[] => {
  const value = getPropertyByPath(obj, path, schemas);
  if (!options?.required && !value) {
    return [];
  }
  if (!value || '$ref' in value || value.type !== 'array' || !value.items) {
    throw new Error(`Invalid '${path}' in ApiSpec`);
  }
  return (value.items as Schema[])
    .map((item) => getText(item)).filter((item): item is string => !!item);
};

const getSchemaPropertiesByPath = <O extends { required: boolean }>(
  obj: Schema, path: string, schemas: SchemaMapping, options?: O,
): O extends { required: true } ? Record<string, Schema> : Record<string, Schema> | undefined => {
  const value = getPropertyByPath(obj, path, schemas);
  if (!options?.required && !value) {
    return undefined as any;
  }
  if (!value || '$ref' in value || value.type !== 'object' || !value.properties) {
    throw new Error(`Invalid '${path}' in ApiSpec`);
  }
  return value.properties;
};

const getOpenapiPaths = (
  openapiSchemas: SchemaMapping,
  tspecSymbols: string[],
): OpenAPIV3.PathsObject => {
  const paths: OpenAPIV3.PathsObject = {};
  tspecSymbols.forEach((tspecSymbol) => {
    const { properties: ApiSpecs = {} } = openapiSchemas[tspecSymbol];
    Object.entries(ApiSpecs).forEach(([methodAndPath, value]) => {
      DEBUG({ methodAndPath });
      const url = getTextPropertyByPath(value, 'url', openapiSchemas, { required: true });
      const method = getTextPropertyByPath(value, 'method', openapiSchemas, { required: true })
        ?.toLowerCase() as OpenAPIV3.HttpMethods;
      const summary = getTextPropertyByPath(value, 'summary', openapiSchemas);
      const tags = getTextListPropertyByPath(value, 'tags', openapiSchemas);
      const responses = getSchemaPropertiesByPath(
        value,
        'responses',
        openapiSchemas,
        { required: true },
      );
      const path = getSchemaPropertiesByPath(value, 'path', openapiSchemas);
      const query = getSchemaPropertiesByPath(value, 'query', openapiSchemas);
      const body = getSchemaPropertiesByPath(value, 'body', openapiSchemas);

      const operation = {
        operationId: `${tspecSymbol}_${methodAndPath.replace(/\s/g, '_')}`,
        tags,
        summary,
        parameters: resolveParameters(path, query),
        requestBody: body && {
          description: body.description,
          required: true,
          content: {
            'application/json': {
              schema: body,
            },
          },
        },
        responses: Object.fromEntries(
          Object.entries(responses).map(([code, schema]) => {
            const resSchema = {
              description: (schema as any).description || '',
              content: {
                'application/json': {
                  schema,
                },
              },
            };
            return [code, resSchema];
          }),
        ),
      };
      (paths[url] ||= {})[method] = operation as any;
    });
  });

  return paths;
};

export const generateTspec = async (
  params: Tspec.GenerateParams = {},
): Promise<OpenAPIV3.Document> => {
  const {
    openapiSchemas, tspecSymbols,
  } = await getOpenapiSchemas(
    params.tsconfigPath || 'tsconfig.json',
    params.specPathGlobs || ['src/**/*.ts'],
  );

  const paths = getOpenapiPaths(openapiSchemas, tspecSymbols);
  const schemas = Object.fromEntries(
    Object.entries(openapiSchemas).filter(([key]) => (!tspecSymbols.includes(key))),
  );

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
    fs.writeFileSync(params.outputPath, JSON.stringify(openapi, null, 2));
  }

  return openapi;
};

/**
 * 제대로 동작하지 않는 케이스 (테스트 케이스)
 * 1. Partial of Record
 * export type BlockRegions = Partial<Record<'es' | 'en', { blockAt: string }>>;
 */
