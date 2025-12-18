import { OpenAPIV3 } from 'openapi-types';

import {
  NestControllerMetadata,
  NestMethodMetadata,
  NestParameterMetadata,
  ParsedNestApp,
} from './types';

export interface GenerateOpenApiOptions {
  title?: string;
  version?: string;
  description?: string;
  servers?: OpenAPIV3.ServerObject[];
  securitySchemes?: OpenAPIV3.ComponentsObject['securitySchemes'];
}

export const generateOpenApiFromNest = (
  app: ParsedNestApp,
  options: GenerateOpenApiOptions = {},
): OpenAPIV3.Document => {
  const paths: OpenAPIV3.PathsObject = {};
  const schemas: Record<string, OpenAPIV3.SchemaObject> = {};

  for (const controller of app.controllers) {
    const basePath = controller.path ? `/${controller.path}`.replace(/\/+/g, '/') : '';

    for (const method of controller.methods) {
      const methodPath = method.path ? `/${method.path}`.replace(/\/+/g, '/') : '';
      let fullPath = `${basePath}${methodPath}`.replace(/\/+/g, '/') || '/';
      
      // Convert :param to {param} for OpenAPI
      fullPath = fullPath.replace(/:(\w+)/g, '{$1}');

      if (!paths[fullPath]) {
        paths[fullPath] = {};
      }

      const operation = buildOperation(method, controller, schemas);
      (paths[fullPath] as OpenAPIV3.PathItemObject)[method.httpMethod] = operation;
    }
  }

  return {
    openapi: '3.0.3',
    info: {
      title: options.title || 'API',
      version: options.version || '1.0.0',
      description: options.description || '',
    },
    servers: options.servers,
    paths,
    components: {
      schemas: Object.keys(schemas).length > 0 ? schemas : undefined,
      securitySchemes: options.securitySchemes,
    },
  };
};

const buildOperation = (
  method: NestMethodMetadata,
  controller: NestControllerMetadata,
  schemas: Record<string, OpenAPIV3.SchemaObject>,
): OpenAPIV3.OperationObject => {
  const parameters: OpenAPIV3.ParameterObject[] = [];
  let requestBody: OpenAPIV3.RequestBodyObject | undefined;

  for (const param of method.parameters) {
    if (param.category === 'body') {
      requestBody = {
        required: param.required,
        content: {
          'application/json': {
            schema: buildSchemaRef(param.type, schemas),
          },
        },
      };
    } else {
      parameters.push({
        name: param.name,
        in: param.category === 'param' ? 'path' : param.category,
        required: param.category === 'param' ? true : param.required,
        schema: buildPrimitiveSchema(param.type),
      });
    }
  }

  const returnType = unwrapPromise(method.returnType);
  const responses: OpenAPIV3.ResponsesObject = {};

  if (returnType === 'void') {
    responses['204'] = { description: 'No Content' };
  } else {
    responses['200'] = {
      description: 'Successful response',
      content: {
        'application/json': {
          schema: buildSchemaRef(returnType, schemas),
        },
      },
    };
  }

  const tags = method.tags?.length ? method.tags : [controller.name.replace(/Controller$/, '')];

  return {
    operationId: `${controller.name}_${method.name}`,
    summary: method.summary,
    description: method.description,
    tags,
    parameters: parameters.length > 0 ? parameters : undefined,
    requestBody,
    responses,
  };
};

const buildSchemaRef = (
  typeName: string,
  schemas: Record<string, OpenAPIV3.SchemaObject>,
): OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject => {
  const primitiveSchema = buildPrimitiveSchema(typeName);
  if (primitiveSchema.type) {
    return primitiveSchema;
  }

  // Handle array types
  const arrayMatch = typeName.match(/^(.+)\[\]$/);
  if (arrayMatch) {
    return {
      type: 'array',
      items: buildSchemaRef(arrayMatch[1], schemas),
    };
  }

  // Handle generic array types like Array<T>
  const genericArrayMatch = typeName.match(/^Array<(.+)>$/);
  if (genericArrayMatch) {
    return {
      type: 'array',
      items: buildSchemaRef(genericArrayMatch[1], schemas),
    };
  }

  // Register as a reference schema
  if (!schemas[typeName]) {
    schemas[typeName] = {
      type: 'object',
      description: `Schema for ${typeName}`,
    };
  }

  return { $ref: `#/components/schemas/${typeName}` };
};

const buildPrimitiveSchema = (typeName: string): OpenAPIV3.SchemaObject => {
  switch (typeName.toLowerCase()) {
    case 'string':
      return { type: 'string' };
    case 'number':
      return { type: 'number' };
    case 'boolean':
      return { type: 'boolean' };
    case 'any':
    case 'unknown':
      return {};
    default:
      return {};
  }
};

const unwrapPromise = (type: string): string => {
  const promiseMatch = type.match(/^Promise<(.+)>$/);
  if (promiseMatch) {
    return promiseMatch[1];
  }
  return type;
};
