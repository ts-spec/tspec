import { OpenAPIV3 } from 'openapi-types';
import { Tspec } from "../types/tspec";
import { getOpenApiType } from './getOpenApiType';

export const generateOpenApiSpec = (specs: Tspec.ParsedApiSpec[]): OpenAPIV3.Document => ({
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
    },
    servers: [{ url: '/' }],
    tags: buildTags(specs),
    paths: buildPaths(specs),
});

const buildTags = (specs: Tspec.ParsedApiSpec[]): OpenAPIV3.TagObject[] => {
  const tags = specs.map((spec) => spec.tags || []).flat();
  const dedupedTags = [...new Set(tags)];
  return dedupedTags.map((tag) => ({ name: tag }));
}

const buildPaths = (specs: Tspec.ParsedApiSpec[]): OpenAPIV3.PathsObject => {
  const paths: OpenAPIV3.PathsObject = {};
  const getPath = (pathName: string) => (paths[pathName] ||= {});

  for (const spec of specs) {
    const [method, pathName] = spec.url.split(' ');
    const path = getPath(pathName);
    const httpMethod = method.toLowerCase() as OpenAPIV3.HttpMethods;
    path[httpMethod] = buildOperation(spec);
  }

  return paths;
}

const buildOperation = (spec: Tspec.ParsedApiSpec): OpenAPIV3.OperationObject => {
  const { operationId, summary, description, tags, auth, path, query, body, response } = spec;
  return {
    tags,
    summary,
    description,
    operationId,
    parameters: buildParameters({ path, query }),
    requestBody: buildRequestBody(body),
    responses: buildResponses(response),
    security: buildSecurity(auth),
  };
}

const buildParameters = (
  params: { path: Tspec.ParsedApiSpec['path'], query: Tspec.ParsedApiSpec['query']}
): OpenAPIV3.ParameterObject[] | undefined => {
  const pathParams = params.path?.type ? buildParametersByType('path', params.path.type) : [];
  const queryParams = params.query?.type ? buildParametersByType('query', params.query.type) : [];
  const parameters = [...pathParams, ...queryParams];
  return parameters.length > 0 ? parameters : undefined;
}

const buildParametersByType = (
  parameterType: 'path' | 'query', type: Tspec.ObjectType
): OpenAPIV3.ParameterObject[] => {
  return type.properties.map((property) => ({
    name: property.name,
    in: parameterType,
    description: property.description,
    required: parameterType === 'path' ? true : property.required,
    deprecated: property.deprecated ? true : undefined,
    schema: getOpenApiType(property.type),
    example: property.example,
  }));
}

const buildRequestBody = (body: Tspec.ParsedApiSpec['body']): OpenAPIV3.RequestBodyObject | undefined => {
  if (!body) return undefined;
  return {
    description: body.description,
    required: body.required,
    content: {
      'application/json': {
        schema: getOpenApiType(body.type),
      },
    },
  };
}

const buildResponses = (response: Tspec.ParsedApiSpec['response']): OpenAPIV3.ResponsesObject => {
  return {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: getOpenApiType(response.type),
        },
      },
    },
  };
}

const buildSecurity = (auth: Tspec.ParsedApiSpec['auth']): OpenAPIV3.SecurityRequirementObject[] | undefined => { 
  if (!auth) return undefined;
  return [{ [auth]: [] }];
}
