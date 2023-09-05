import debug from 'debug';
import { OpenAPIV3 } from 'openapi-types';
import * as TJS from 'typescript-json-schema';

import { assertIsDefined } from '../utils/types';

import {
  accessSchema, getObjectPropertyByPath, getPropertyByPath, getTextListPropertyByPath, getTextPropertyByPath,
} from './schemaParser';
import { SchemaMapping } from './types';

export const DEBUG = debug('tspec');

type ParameterSchema = TJS.Definition & {
  example?: any;
  style?: any;
  explode?: any;
  allowReserved?: any;
  allowEmptyValue?: any;
}

const parseBooleanAnnotation = (value: any) => {
  if (value === undefined) {
    return undefined;
  }
  if (value === '' || value === 'true' || value === true) {
    return true;
  }
  return false;
};

const getParameters = (obj: TJS.Definition, inType: 'query' | 'path' | 'header' | 'cookie') => {
  const { properties, required } = obj;
  if (!properties) {
    return undefined;
  }
  return Object.entries(properties).map(([key, schema]) => {
    const {
      description, style, explode, allowReserved, allowEmptyValue,...rest
    } = schema as ParameterSchema;
    return {
      description,
      name: key,
      in: inType,
      required: inType === 'path' ? true : (required || []).includes(key),
      schema: rest,
      style,
      explode: parseBooleanAnnotation(explode),
      allowReserved: parseBooleanAnnotation(allowReserved), 
      allowEmptyValue: parseBooleanAnnotation(allowEmptyValue),
    };
  });
};

interface ResolveParametersParams {
  path: TJS.Definition | undefined;
  query: TJS.Definition | undefined;
  header: TJS.Definition | undefined;
  cookie: TJS.Definition | undefined;
};

const resolveParameters = ({ path, query, header, cookie }: ResolveParametersParams) => {
  const pathParams = (path && getParameters(path, 'path')) || [];
  const queryParams = (query && getParameters(query, 'query')) || [];
  const headerParams = (header && getParameters(header, 'header')) || [];
  const cookieParams = (cookie && getParameters(cookie, 'cookie')) || [];
  return [...pathParams, ...queryParams, ...headerParams, ...cookieParams];
};

const omitPathSchemaFields = (schema: OpenAPIV3.SchemaObject & { mediaType?: string }) => {
  const { mediaType, ...rest } = schema;
  return rest;
}

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
    DEBUG({ spec: JSON.stringify(spec, null, 2) });
    const url = getTextPropertyByPath(spec, 'url', openapiSchemas, { required: true });
    const summary = getTextPropertyByPath(spec, 'summary', openapiSchemas);
    const description = getTextPropertyByPath(spec, 'description', openapiSchemas);
    const security = getTextPropertyByPath(spec, 'security', openapiSchemas);
    const tags = getTextListPropertyByPath(spec, 'tags', openapiSchemas);
    const responses = getObjectPropertyByPath(
      spec,
      'responses',
      openapiSchemas,
      { required: true },
    )!;

    const pathParams = getObjectPropertyByPath(spec, 'path', openapiSchemas) as any;
    const queryParams = getObjectPropertyByPath(spec, 'query', openapiSchemas) as any;
    const headerParams = getObjectPropertyByPath(spec, 'header', openapiSchemas) as any;
    const cookieParams = getObjectPropertyByPath(spec, 'cookie', openapiSchemas) as any;
    const bodyParams = getObjectPropertyByPath(spec, 'body', openapiSchemas) as any;

    const operation = {
      operationId: `${controllerName}_${method}_${path}`,
      tags,
      summary,
      description,
      security: security && [{ [security]: [] }],
      parameters: resolveParameters({
        path: pathParams,
        query: queryParams,
        header: headerParams,
        cookie: cookieParams,
      }),
      requestBody: bodyParams && {
        description: bodyParams.description,
        required: true,
        content: {
          [bodyParams?.mediaType || 'application/json']: {
            schema: omitPathSchemaFields(bodyParams),
          },
        },
      },
      responses: Object.fromEntries(
        Object.keys(responses.properties).map((code) => {
          const schema = getPropertyByPath(responses, code, openapiSchemas);
          const { description = '', mediaType } = schema as any;
          const resSchema = {
            description,
            content: {
              [mediaType || 'application/json']: {
                schema: responses.properties[code],
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
