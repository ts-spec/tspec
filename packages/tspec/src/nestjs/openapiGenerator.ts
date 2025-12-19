import { OpenAPIV3 } from 'openapi-types';

import {
  NestControllerMetadata,
  NestMethodMetadata,
  ParsedNestApp,
} from './types';
import {
  buildSchemaRef as buildSchemaRefFromBuilder,
  buildPrimitiveSchema as buildPrimitiveSchemaFromBuilder,
  unwrapPromise as unwrapPromiseFromBuilder,
  createSchemaBuilderContext,
  SchemaBuilderContext,
} from '../generator/schemaBuilder';

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
  const context = createSchemaBuilderContext(app.typeDefinitions, app.enumDefinitions);

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

      const operation = buildOperation(method, controller, context);
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
      schemas: Object.keys(context.schemas).length > 0 ? context.schemas : undefined,
      securitySchemes: options.securitySchemes,
    },
  };
};

const buildOperation = (
  method: NestMethodMetadata,
  controller: NestControllerMetadata,
  context: SchemaBuilderContext,
): OpenAPIV3.OperationObject => {
  const parameters: OpenAPIV3.ParameterObject[] = [];
  let requestBody: OpenAPIV3.RequestBodyObject | undefined;

  // Check for file upload parameters
  const fileParams = method.parameters.filter(p => p.category === 'file' || p.category === 'files');
  const bodyParams = method.parameters.filter(p => p.category === 'body');

  if (fileParams.length > 0) {
    // Build multipart/form-data request body for file uploads
    const properties: Record<string, OpenAPIV3.SchemaObject> = {};
    const required: string[] = [];

    for (const fileParam of fileParams) {
      const fieldName = fileParam.fieldName || fileParam.name;
      if (fileParam.category === 'files') {
        properties[fieldName] = {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        };
      } else {
        properties[fieldName] = { type: 'string', format: 'binary' };
      }
      if (fileParam.required) {
        required.push(fieldName);
      }
    }

    // Include body params in multipart form if present
    for (const bodyParam of bodyParams) {
      const bodySchema = buildSchemaRefFromBuilder(bodyParam.type, context);
      if ('properties' in bodySchema && bodySchema.properties) {
        Object.assign(properties, bodySchema.properties);
        if (bodySchema.required) {
          required.push(...bodySchema.required);
        }
      }
    }

    requestBody = {
      required: fileParams.some(p => p.required),
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties,
            required: required.length > 0 ? required : undefined,
          },
        },
      },
    };
  } else {
    for (const param of method.parameters) {
      if (param.category === 'body') {
        requestBody = {
          required: param.required,
          content: {
            'application/json': {
              schema: buildSchemaRefFromBuilder(param.type, context),
            },
          },
        };
      }
    }
  }

  for (const param of method.parameters) {
    if (param.category !== 'body' && param.category !== 'file' && param.category !== 'files') {
      parameters.push({
        name: param.name,
        in: param.category === 'param' ? 'path' : param.category,
        required: param.category === 'param' ? true : param.required,
        schema: buildPrimitiveSchemaFromBuilder(param.type),
      });
    }
  }

  const returnType = unwrapPromiseFromBuilder(method.returnType);
  const responses: OpenAPIV3.ResponsesObject = {};

  if (returnType === 'void') {
    responses['204'] = { description: 'No Content' };
  } else {
    responses['200'] = {
      description: 'Successful response',
      content: {
        'application/json': {
          schema: buildSchemaRefFromBuilder(returnType, context),
        },
      },
    };
  }

  // Priority: method tags > controller @ApiTags > controller name
  const tags = method.tags?.length 
    ? method.tags 
    : controller.tags?.length 
      ? controller.tags 
      : [controller.name.replace(/Controller$/, '')];

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
