import { OpenAPIV3 } from 'openapi-types';

import {
  NestControllerMetadata,
  NestMethodMetadata,
  NestParameterMetadata,
  ParsedNestApp,
  TypeDefinition,
  EnumDefinition,
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

      const operation = buildOperation(method, controller, schemas, app.typeDefinitions, app.enumDefinitions);
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
  typeDefinitions: Map<string, TypeDefinition>,
  enumDefinitions: Map<string, EnumDefinition>,
): OpenAPIV3.OperationObject => {
  const parameters: OpenAPIV3.ParameterObject[] = [];
  let requestBody: OpenAPIV3.RequestBodyObject | undefined;

  for (const param of method.parameters) {
    if (param.category === 'body') {
      requestBody = {
        required: param.required,
        content: {
          'application/json': {
            schema: buildSchemaRef(param.type, schemas, typeDefinitions, enumDefinitions),
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
          schema: buildSchemaRef(returnType, schemas, typeDefinitions, enumDefinitions),
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

const buildSchemaRef = (
  typeName: string,
  schemas: Record<string, OpenAPIV3.SchemaObject>,
  typeDefinitions: Map<string, TypeDefinition>,
  enumDefinitions: Map<string, EnumDefinition>,
): OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject => {
  const primitiveSchema = buildPrimitiveSchema(typeName);
  if (primitiveSchema.type) {
    return primitiveSchema;
  }

  // Handle nullable types (T | null, T | undefined)
  const nullableMatch = typeName.match(/^(.+?)\s*\|\s*(null|undefined)$/) ||
                        typeName.match(/^(null|undefined)\s*\|\s*(.+)$/);
  if (nullableMatch) {
    const innerType = nullableMatch[1] === 'null' || nullableMatch[1] === 'undefined' 
      ? nullableMatch[2] 
      : nullableMatch[1];
    const innerSchema = buildSchemaRef(innerType.trim(), schemas, typeDefinitions, enumDefinitions);
    // OpenAPI 3.0 nullable
    if ('$ref' in innerSchema) {
      return { allOf: [innerSchema], nullable: true };
    }
    return { ...innerSchema, nullable: true };
  }

  // Handle inline object types like { status: string; message: string; }
  if (typeName.startsWith('{') && typeName.endsWith('}')) {
    return parseInlineObjectType(typeName, schemas, typeDefinitions, enumDefinitions);
  }

  // Handle array types
  const arrayMatch = typeName.match(/^(.+)\[\]$/);
  if (arrayMatch) {
    return {
      type: 'array',
      items: buildSchemaRef(arrayMatch[1], schemas, typeDefinitions, enumDefinitions),
    };
  }

  // Handle generic array types like Array<T>
  const genericArrayMatch = typeName.match(/^Array<(.+)>$/);
  if (genericArrayMatch) {
    return {
      type: 'array',
      items: buildSchemaRef(genericArrayMatch[1], schemas, typeDefinitions, enumDefinitions),
    };
  }

  // Handle generic types like DataResponse<T>, PaginatedResponse<T>
  const genericMatch = typeName.match(/^(\w+)<(.+)>$/);
  if (genericMatch) {
    const [, wrapperType, innerType] = genericMatch;
    
    // Look up the wrapper type definition and substitute the type parameter
    const wrapperDef = typeDefinitions.get(wrapperType);
    if (wrapperDef && wrapperDef.properties.length > 0) {
      const properties: Record<string, OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject> = {};
      const required: string[] = [];

      for (const prop of wrapperDef.properties) {
        // Substitute type parameter T with the actual inner type
        let propType = prop.type;
        if (propType === 'T') {
          propType = innerType;
        } else if (propType === 'T[]') {
          propType = `${innerType}[]`;
        } else if (propType.includes('<T>')) {
          propType = propType.replace('<T>', `<${innerType}>`);
        }
        
        properties[prop.name] = buildSchemaRef(propType, schemas, typeDefinitions, enumDefinitions);
        if (prop.required) {
          required.push(prop.name);
        }
      }

      return {
        type: 'object',
        properties,
        required: required.length > 0 ? required : undefined,
      };
    }
    
    // Fallback: just resolve the inner type if wrapper definition not found
    return buildSchemaRef(innerType, schemas, typeDefinitions, enumDefinitions);
  }

  // Handle Date type
  if (typeName === 'Date') {
    return { type: 'string', format: 'date-time' };
  }

  // Check if it's an enum
  const enumDef = enumDefinitions.get(typeName);
  if (enumDef) {
    if (!schemas[typeName]) {
      schemas[typeName] = {
        type: 'string',
        enum: enumDef.values,
        description: enumDef.description,
      };
    }
    return { $ref: `#/components/schemas/${typeName}` };
  }

  // Register as a reference schema with resolved properties
  if (!schemas[typeName]) {
    const typeDef = typeDefinitions.get(typeName);
    if (typeDef && typeDef.properties.length > 0) {
      const properties: Record<string, OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject> = {};
      const required: string[] = [];

      for (const prop of typeDef.properties) {
        const baseSchema = buildSchemaRef(prop.type, schemas, typeDefinitions, enumDefinitions);
        
        // Merge JSDoc tags into the schema
        const propSchema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject = '$ref' in baseSchema
          ? baseSchema
          : {
              ...baseSchema,
              description: prop.description || baseSchema.description,
              example: prop.example,
              format: prop.format || baseSchema.format,
              deprecated: prop.deprecated,
              minimum: prop.minimum,
              maximum: prop.maximum,
              minLength: prop.minLength,
              maxLength: prop.maxLength,
              pattern: prop.pattern,
              default: prop.default,
            };
        
        // Clean up undefined values
        if (!('$ref' in propSchema)) {
          Object.keys(propSchema).forEach((key) => {
            if ((propSchema as Record<string, unknown>)[key] === undefined) {
              delete (propSchema as Record<string, unknown>)[key];
            }
          });
        }
        
        properties[prop.name] = propSchema;
        if (prop.required) {
          required.push(prop.name);
        }
      }

      schemas[typeName] = {
        type: 'object',
        description: typeDef.description,
        properties,
        required: required.length > 0 ? required : undefined,
      };
    } else {
      schemas[typeName] = {
        type: 'object',
        description: `Schema for ${typeName}`,
      };
    }
  }

  return { $ref: `#/components/schemas/${typeName}` };
};

// Parse inline object types like { status: string; message: string; }
const parseInlineObjectType = (
  typeName: string,
  schemas: Record<string, OpenAPIV3.SchemaObject>,
  typeDefinitions: Map<string, TypeDefinition>,
  enumDefinitions: Map<string, EnumDefinition>,
): OpenAPIV3.SchemaObject => {
  const inner = typeName.slice(1, -1).trim();
  if (!inner) {
    return { type: 'object' };
  }

  const properties: Record<string, OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject> = {};
  const required: string[] = [];

  // Parse properties like "status: string; message: string;"
  const propMatches = inner.split(';').filter(p => p.trim());
  for (const propStr of propMatches) {
    const colonIndex = propStr.indexOf(':');
    if (colonIndex === -1) continue;

    let propName = propStr.slice(0, colonIndex).trim();
    const propType = propStr.slice(colonIndex + 1).trim();

    // Check for optional property (name?)
    const isOptional = propName.endsWith('?');
    if (isOptional) {
      propName = propName.slice(0, -1);
    }

    properties[propName] = buildSchemaRef(propType, schemas, typeDefinitions, enumDefinitions);
    if (!isOptional) {
      required.push(propName);
    }
  }

  return {
    type: 'object',
    properties,
    required: required.length > 0 ? required : undefined,
  };
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
