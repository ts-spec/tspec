import { OpenAPIV3 } from 'openapi-types';

/**
 * Sanitize a type name to be a valid OpenAPI schema name.
 * Removes or replaces characters that are not allowed in schema names.
 * e.g., "Record<string, unknown>" -> "Record_string_unknown_"
 *       "string | null" -> "string_or_null"
 */
export const sanitizeSchemaName = (typeName: string): string => {
  return typeName
    .replace(/\s*\|\s*/g, '_or_')  // Union types: " | " -> "_or_"
    .replace(/</g, '_')            // Generic open bracket
    .replace(/>/g, '_')            // Generic close bracket
    .replace(/,\s*/g, '_')         // Comma with optional space
    .replace(/\s+/g, '_')          // Any remaining whitespace
    .replace(/[^a-zA-Z0-9_]/g, '') // Remove any other special characters
    .replace(/_+/g, '_');          // Collapse multiple underscores
};

export interface TypeDefinition {
  name: string;
  properties: PropertyDefinition[];
  description?: string;
}

export interface PropertyDefinition {
  name: string;
  type: string;
  required: boolean;
  description?: string;
  isArray?: boolean;
  enumValues?: string[];
  example?: unknown;
  format?: string;
  deprecated?: boolean;
  nullable?: boolean;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  default?: unknown;
}

export interface EnumDefinition {
  name: string;
  values: string[];
  description?: string;
}

export interface SchemaBuilderContext {
  schemas: Record<string, OpenAPIV3.SchemaObject>;
  typeDefinitions: Map<string, TypeDefinition>;
  enumDefinitions: Map<string, EnumDefinition>;
}

export const buildPrimitiveSchema = (typeName: string): OpenAPIV3.SchemaObject => {
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

export const unwrapPromise = (type: string): string => {
  const promiseMatch = type.match(/^Promise<(.+)>$/);
  if (promiseMatch) {
    return promiseMatch[1];
  }
  return type;
};

export const buildSchemaRef = (
  typeName: string,
  context: SchemaBuilderContext,
): OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject => {
  const { schemas, typeDefinitions, enumDefinitions } = context;

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
    const innerSchema = buildSchemaRef(innerType.trim(), context);
    // OpenAPI 3.0.x: use oneOf with null type for nullable $ref
    // allOf + nullable is not valid in OpenAPI 3.0 (nullable requires type field)
    if ('$ref' in innerSchema) {
      return { oneOf: [innerSchema, { type: 'null' as const }] } as OpenAPIV3.SchemaObject;
    }
    return { ...innerSchema, nullable: true };
  }

  // Handle inline object types like { status: string; message: string; }
  if (typeName.startsWith('{') && typeName.endsWith('}')) {
    return parseInlineObjectType(typeName, context);
  }

  // Handle array types
  const arrayMatch = typeName.match(/^(.+)\[\]$/);
  if (arrayMatch) {
    return {
      type: 'array',
      items: buildSchemaRef(arrayMatch[1], context),
    };
  }

  // Handle generic array types like Array<T>
  const genericArrayMatch = typeName.match(/^Array<(.+)>$/);
  if (genericArrayMatch) {
    return {
      type: 'array',
      items: buildSchemaRef(genericArrayMatch[1], context),
    };
  }

  // Handle generic types like DataResponse<T>, PaginatedResponse<T>, Record<K, V>
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
        
        properties[prop.name] = buildSchemaRef(propType, context);
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
    
    // Fallback for unknown generic types: return inline object schema
    // This prevents creating schemas with invalid names like "string, unknown"
    return { type: 'object', additionalProperties: true };
  }

  // Handle Date type
  if (typeName === 'Date') {
    return { type: 'string', format: 'date-time' };
  }

  // Check if it's an enum
  const enumDef = enumDefinitions.get(typeName);
  if (enumDef) {
    const schemaName = sanitizeSchemaName(typeName);
    if (!schemas[schemaName]) {
      schemas[schemaName] = {
        type: 'string',
        enum: enumDef.values,
        description: enumDef.description,
      };
    }
    return { $ref: `#/components/schemas/${schemaName}` };
  }

  // Sanitize the type name for use as a schema name
  const schemaName = sanitizeSchemaName(typeName);

  // Register as a reference schema with resolved properties
  if (!schemas[schemaName]) {
    const typeDef = typeDefinitions.get(typeName);
    if (typeDef && typeDef.properties.length > 0) {
      const properties: Record<string, OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject> = {};
      const required: string[] = [];

      for (const prop of typeDef.properties) {
        const baseSchema = buildSchemaRef(prop.type, context);
        
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

      schemas[schemaName] = {
        type: 'object',
        description: typeDef.description,
        properties,
        required: required.length > 0 ? required : undefined,
      };
    } else {
      schemas[schemaName] = {
        type: 'object',
        description: `Schema for ${typeName}`,
      };
    }
  }

  return { $ref: `#/components/schemas/${schemaName}` };
};

// Parse inline object types like { status: string; message: string; }
const parseInlineObjectType = (
  typeName: string,
  context: SchemaBuilderContext,
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

    properties[propName] = buildSchemaRef(propType, context);
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

export const createSchemaBuilderContext = (
  typeDefinitions?: Map<string, TypeDefinition>,
  enumDefinitions?: Map<string, EnumDefinition>,
): SchemaBuilderContext => ({
  schemas: {},
  typeDefinitions: typeDefinitions || new Map(),
  enumDefinitions: enumDefinitions || new Map(),
});
