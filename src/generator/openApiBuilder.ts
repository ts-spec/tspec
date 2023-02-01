import { OpenAPIV3 as oapi3 } from 'openapi-types';

import {
  isObjectSchemaObject,
  isReferenceObject,
  isStringSchemaObject,
  oapiSchema,
} from './utils';

const OPENAPI_VERSION = '3.0.0';

const extractString = (schema: oapiSchema) => {
  if (!isStringSchemaObject(schema)) {
    return undefined;
  }
  return schema['enum'] ? schema['enum'][0] : undefined;
};

export const buildComponentsObject = async (
  schemaMap: Map<string, oapiSchema>,
): Promise<oapi3.ComponentsObject> => {
  const schemas: oapi3.ComponentsObject['schemas'] = {};
  for (const [key, val] of schemaMap) {
    schemas[key] = val;
  }
  return { schemas };
};

const buildResponsesObject = async (
  schema: oapiSchema,
): Promise<oapi3.ResponsesObject> => {
  if (!isObjectSchemaObject(schema)) {
    throw Error('There is no response');
  }

  const responseObject: oapi3.ResponsesObject = {};
  for (const [key, val] of Object.entries(schema.properties)) {
    responseObject[key] = await buildResponseObject(val);
  }
  return responseObject;
};
const buildMediaTypeObject = async (
  schema: oapiSchema,
): Promise<oapi3.MediaTypeObject> => {
  return { schema };
};

const buildResponseObject = async (
  schema: oapiSchema,
  description = '',
  contentType = 'application/json',
): Promise<oapi3.ResponseObject | oapi3.ReferenceObject> => {
  if (isReferenceObject(schema)) {
    return schema;
  }
  const mediaTypeObject = await buildMediaTypeObject(schema);

  const responseBodyObject: oapi3.ResponseObject = { description, content: {} };
  responseBodyObject['content']![contentType] = mediaTypeObject;
  return responseBodyObject;
};

const buildRequestBodyObject = async (
  schema: oapiSchema,
  contentType = 'application/json',
): Promise<oapi3.RequestBodyObject> => {
  const mediaTypeObject = await buildMediaTypeObject(schema);

  const requestBodyObject: oapi3.RequestBodyObject = { content: {} };
  requestBodyObject['content'][contentType] = mediaTypeObject;
  return requestBodyObject;
};

const buildParameterObjects = async (
  schema: oapiSchema,
  parameterIn: 'query' | 'path',
) => {
  if (!isObjectSchemaObject(schema)) {
    return undefined;
  }
  const paramterObjects: oapi3.ParameterObject[] = [];
  for (const [key, val] of Object.entries(schema.properties)) {
    const param = { name: key, in: parameterIn, schema: val };
    paramterObjects.push(param);
  }
  return paramterObjects;
};

interface OperationObjectWithPathInfo {
  operationObject: oapi3.OperationObject;
  method: string;
  url: string;
}

const buildOperationObjectWithPathInfo = async (
  schema: oapiSchema,
): Promise<OperationObjectWithPathInfo> => {
  if (!isObjectSchemaObject(schema)) {
    throw Error('schema is not object schema object');
  }

  const operationObject: oapi3.OperationObject = { responses: {} };
  let method: string | undefined = undefined;
  let url: string | undefined = undefined;
  let paramterObjects: oapi3.ParameterObject[] = [];

  for await (const [key, val] of Object.entries(schema.properties)) {
    if (key === 'method') {
      method = extractString(val);
    } else if (key === 'url') {
      url = extractString(val);
    } else if (key === 'summary' || key === 'description') {
      operationObject[key] = extractString(val);
    } else if (key === 'tags') {
      operationObject[key] = extractString(val);
    } else if (key === 'query' || key == 'path') {
      const params = await buildParameterObjects(val, key);
      if (params) {
        paramterObjects = [...paramterObjects, ...params];
      }
    } else if (key === 'responses') {
      operationObject['responses'] = await buildResponsesObject(val);
    } else if (key === 'body') {
      operationObject['requestBody'] = await buildRequestBodyObject(val);
    }
  }

  if (paramterObjects.length > 0) {
    operationObject['parameters'] = paramterObjects;
  }

  const pathItemObject: oapi3.PathItemObject = {};
  if (!method) {
    throw Error('NO method');
  }
  if (!url) {
    throw Error('No URL for path item obejct');
  }

  return { operationObject, url, method };
};

export const buildPathsObject = async (routerSchemas: oapiSchema[]) => {
  const pathsObject: oapi3.PathsObject = {};

  for await (const routerSchema of routerSchemas) {
    if (!isObjectSchemaObject(routerSchema)) {
      continue;
    }
    const routerInfo = routerSchema['properties'];

    for await (const [signature, val] of Object.entries(routerInfo)) {
      const { operationObject, url, method } =
        await buildOperationObjectWithPathInfo(val);

      if (!pathsObject[url]) {
        pathsObject[url] = {};
      }
      pathsObject[url]![method as oapi3.HttpMethods] = operationObject;
    }
  }
  return pathsObject;
};

export const buildBasicOpenApiDocument = (): oapi3.Document => {
  const infoObject = buildInfoObject();
  return {
    openapi: OPENAPI_VERSION,
    info: infoObject,
    paths: {},
  };
};

const buildInfoObject = (
  title = 'openAPI',
  version = '0.0.1',
): oapi3.InfoObject => {
  return { title, version };
};

export const buildOpenApiDocument = async (
  routerSchemas: oapiSchema[],
): Promise<oapi3.Document<{}>> => {
  const openApiDocument = buildBasicOpenApiDocument();
  const pathsObject = await buildPathsObject(routerSchemas);

  openApiDocument['paths'] = pathsObject;
  return openApiDocument;
};
