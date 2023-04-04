import debug from 'debug';
import { OpenAPIV3 } from 'openapi-types';
import * as TJS from 'typescript-json-schema';

import { assertIsDefined } from '../utils/types';

import {
  accessSchema, getObjectPropertyByPath, getTextListPropertyByPath, getTextPropertyByPath,
} from './schemaParser';
import { SchemaMapping } from './types';

export const DEBUG = debug('tspec');

const getPathOrQueryParams = (obj: TJS.Definition, inType: 'query' | 'path') => {
  const { properties, required } = obj;
  if (!properties) {
    return undefined;
  }
  return Object.entries(properties).map(([key, schema]) => {
    const {
      description, examples, ...rest
    } = schema as TJS.Definition;
    return {
      description,
      name: key,
      in: inType,
      required: inType === 'path' ? true : (required || []).includes(key),
      schema: rest,
      example: Array.isArray(examples) ? examples[0] : examples, // FIXME: tjs does not support example.
    };
  });
};

const resolveParameters = (path: TJS.Definition | undefined, query: TJS.Definition | undefined) => {
  const pathParams = (path && getPathOrQueryParams(path, 'path')) || [];
  const queryParams = (query && getPathOrQueryParams(query, 'query')) || [];
  return [...pathParams, ...queryParams];
};

export const getOpenapiPaths = (
  openapiSchemas: SchemaMapping,
  tspecSymbols: string[],
): OpenAPIV3.PathsObject => {
  const openapiPaths: OpenAPIV3.PathsObject = {};

  const specs = tspecSymbols.flatMap((tspecSymbol) => {
    const paths = openapiSchemas[tspecSymbol].properties || {};
    return Object.keys(paths).flatMap((path) => {
      const methods = accessSchema(paths[path], openapiSchemas)?.properties || {};
      return Object.keys(methods).map((method) => {
        const spec = accessSchema(methods[method], openapiSchemas);
        assertIsDefined(spec);
        return {
          controllerName: tspecSymbol, path, method, spec,
        };
      });
    });
  });

  specs.forEach(({
    controllerName, path, method, spec,
  }) => {
    DEBUG({ controllerName, path, method });
    const url = getTextPropertyByPath(spec, 'url', openapiSchemas, { required: true });
    const summary = getTextPropertyByPath(spec, 'summary', openapiSchemas);
    const security = getTextPropertyByPath(spec, 'security', openapiSchemas);
    const tags = getTextListPropertyByPath(spec, 'tags', openapiSchemas);
    const responses = getObjectPropertyByPath(
      spec,
      'responses',
      openapiSchemas,
      { required: true },
    )!.properties;
    const pathParams = getObjectPropertyByPath(spec, 'path', openapiSchemas);
    const queryParams = getObjectPropertyByPath(spec, 'query', openapiSchemas);
    const bodyParams = getObjectPropertyByPath(spec, 'body', openapiSchemas);

    const operation = {
      operationId: `${controllerName}_${method}_${path}`,
      tags,
      summary,
      security: security && [{ [security]: [] }],
      parameters: resolveParameters(pathParams as any, queryParams as any),
      requestBody: bodyParams && {
        description: bodyParams.description,
        required: true,
        content: {
          'application/json': {
            schema: bodyParams,
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
    (openapiPaths[url] ||= {})[method as OpenAPIV3.HttpMethods] = operation as any;
  });

  return openapiPaths;
};
