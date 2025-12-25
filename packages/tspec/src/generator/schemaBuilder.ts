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
  /**
   * Index signature type for Record<K, V>, Map<K, V>, or { [key: string]: T }
   * TODO(cleanup): This field can be removed once TJS is fully integrated.
   * @deprecated - Will be removed when TJS fallback is no longer needed
   */
  indexSignature?: {
    keyType: string;
    valueType: string;
  };
  /**
   * Type parameter names for generic types (e.g., ['T'] for DataResponse<T>, ['K', 'V'] for Map<K, V>)
   * TODO(cleanup): This field can be removed once TJS is fully integrated.
   * @deprecated - Will be removed when TJS fallback is no longer needed
   */
  typeParameters?: string[];
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
  /**
   * Index signature for Record<K, V>, Map<K, V>, or { [key: string]: T } properties
   * TODO(cleanup): This field can be removed once TJS is fully integrated.
   * @deprecated - Will be removed when TJS fallback is no longer needed
   */
  indexSignature?: {
    keyType: string;
    valueType: string;
  };
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
  /** TJS-generated schemas as fallback for types not found in typeDefinitions */
  tjsSchemas?: Record<string, OpenAPIV3.SchemaObject>;
}

/**
 * Merge JSDoc annotations from PropertyDefinition into an OpenAPI schema.
 * This is a shared utility for building property schemas with JSDoc tags.
 */
export const mergeJsDocAnnotations = (
  baseSchema: OpenAPIV3.SchemaObject,
  prop: PropertyDefinition,
): OpenAPIV3.SchemaObject => {
  const schema: OpenAPIV3.SchemaObject = {
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
  Object.keys(schema).forEach((key) => {
    if ((schema as Record<string, unknown>)[key] === undefined) {
      delete (schema as Record<string, unknown>)[key];
    }
  });

  return schema;
};

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
    // OpenAPI 3.0 nullable
    if ('$ref' in innerSchema) {
      return { allOf: [innerSchema], nullable: true };
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
  // TODO(cleanup): This entire generic handling block can be removed once TJS is fully integrated.
  // TJS already resolves generics, so this manual parsing is only needed as fallback.
  // @deprecated - Will be removed when TJS fallback is no longer needed
  const genericMatch = typeName.match(/^(\w+)<(.+)>$/);
  if (genericMatch) {
    const [, wrapperType, innerType] = genericMatch;
    
    // Look up the wrapper type definition
    const wrapperDef = typeDefinitions.get(wrapperType);
    
    // TODO(cleanup): indexSignature handling - TJS handles this automatically
    // @deprecated - Will be removed when TJS fallback is no longer needed
    // If type definition has indexSignature info (from TypeScript compiler), use it
    if (wrapperDef?.indexSignature) {
      const valueSchema = buildSchemaRef(wrapperDef.indexSignature.valueType, context);
      const isUnknownValue = wrapperDef.indexSignature.valueType === 'unknown' || 
                             wrapperDef.indexSignature.valueType === 'any' ||
                             Object.keys(valueSchema).length === 0;
      return {
        type: 'object',
        additionalProperties: isUnknownValue ? true : valueSchema,
      };
    }
    
    // TODO(cleanup): Type parameter substitution - TJS handles this automatically
    // @deprecated - Will be removed when TJS fallback is no longer needed
    // Substitute type parameter for wrapper types with properties
    if (wrapperDef && wrapperDef.properties.length > 0) {
      const properties: Record<string, OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject> = {};
      const required: string[] = [];
      
      // Parse type arguments from innerType (e.g., "User" or "string, number")
      const typeArgs = parseTypeArguments(innerType);
      // Get type parameter names from wrapper definition (e.g., ['T'] or ['K', 'V'])
      const typeParams = wrapperDef.typeParameters || ['T']; // fallback to 'T' for backward compatibility

      for (const prop of wrapperDef.properties) {
        // Substitute type parameters with actual type arguments
        let propType = substituteTypeParameters(prop.type, typeParams, typeArgs);
        
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
    
    // TODO(cleanup): Record/Map string parsing - TJS handles this automatically
    // @deprecated - Will be removed when TJS fallback is no longer needed
    // Fallback: parse Record<K, V> and Map<K, V> from string when no TypeScript info available
    if (wrapperType === 'Record' || wrapperType === 'Map') {
      const commaIndex = innerType.indexOf(',');
      if (commaIndex !== -1) {
        const valueType = innerType.slice(commaIndex + 1).trim();
        const valueSchema = buildSchemaRef(valueType, context);
        const isUnknownValue = valueType === 'unknown' || valueType === 'any' || 
                               Object.keys(valueSchema).length === 0;
        return {
          type: 'object',
          additionalProperties: isUnknownValue ? true : valueSchema,
        };
      }
    }
    
    // Fallback for other unknown generic types
    return {
      type: 'object',
      additionalProperties: true,
    };
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
    const { tjsSchemas } = context;
    const typeDef = typeDefinitions.get(typeName);
    
    // Priority 1: Handle types with index signature (Record<K, V>, Map<K, V>, { [key: string]: T })
    if (typeDef?.indexSignature) {
      const valueSchema = buildSchemaRef(typeDef.indexSignature.valueType, context);
      const isUnknownValue = typeDef.indexSignature.valueType === 'unknown' || 
                             typeDef.indexSignature.valueType === 'any' ||
                             Object.keys(valueSchema).length === 0;
      schemas[schemaName] = {
        type: 'object',
        description: typeDef.description,
        additionalProperties: isUnknownValue ? true : valueSchema,
      };
    }
    // Priority 2: Use manual parsing with typeDefinitions (preserves JSDoc tags)
    else if (typeDef && typeDef.properties.length > 0) {
      const properties: Record<string, OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject> = {};
      const required: string[] = [];

      for (const prop of typeDef.properties) {
        let baseSchema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject;
        
        // If property has index signature info (from TypeScript's type checker),
        // build schema with additionalProperties
        if (prop.indexSignature) {
          const valueSchema = buildSchemaRef(prop.indexSignature.valueType, context);
          const isUnknownValue = prop.indexSignature.valueType === 'unknown' || 
                                 prop.indexSignature.valueType === 'any' ||
                                 Object.keys(valueSchema).length === 0;
          baseSchema = {
            type: 'object',
            additionalProperties: isUnknownValue ? true : valueSchema,
          };
        } else {
          baseSchema = buildSchemaRef(prop.type, context);
        }
        
        // Merge JSDoc tags into the schema (skip for $ref schemas)
        const propSchema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject = '$ref' in baseSchema
          ? baseSchema
          : mergeJsDocAnnotations(baseSchema, prop);
        
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
    }
    // Priority 3: Use TJS schema as fallback for types not found in typeDefinitions
    else if (tjsSchemas && (tjsSchemas[typeName] || tjsSchemas[schemaName])) {
      schemas[schemaName] = tjsSchemas[typeName] || tjsSchemas[schemaName];
    }
    // Priority 4: Empty object schema as last resort
    else {
      schemas[schemaName] = {
        type: 'object',
        description: `Schema for ${typeName}`,
      };
    }
  }

  return { $ref: `#/components/schemas/${schemaName}` };
};

/**
 * Parse type arguments from a comma-separated string.
 * Handles nested generics like "Map<string, number>, User"
 * 
 * TODO(cleanup): This function can be removed once TJS is fully integrated.
 * TJS already resolves generics, so this manual parsing is only needed as fallback.
 * @deprecated - Will be removed when TJS fallback is no longer needed
 */
const parseTypeArguments = (innerType: string): string[] => {
  const args: string[] = [];
  let depth = 0;
  let current = '';
  
  for (const char of innerType) {
    if (char === '<') {
      depth++;
      current += char;
    } else if (char === '>') {
      depth--;
      current += char;
    } else if (char === ',' && depth === 0) {
      args.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  if (current.trim()) {
    args.push(current.trim());
  }
  
  return args;
};

/**
 * Substitute type parameters with actual type arguments.
 * e.g., substituteTypeParameters("T", ["T"], ["User"]) => "User"
 *       substituteTypeParameters("T[]", ["T"], ["User"]) => "User[]"
 *       substituteTypeParameters("Array<T>", ["T"], ["User"]) => "Array<User>"
 * 
 * TODO(cleanup): This function can be removed once TJS is fully integrated.
 * TJS already resolves generics, so this manual parsing is only needed as fallback.
 * @deprecated - Will be removed when TJS fallback is no longer needed
 */
const substituteTypeParameters = (
  propType: string,
  typeParams: string[],
  typeArgs: string[],
): string => {
  let result = propType;
  
  for (let i = 0; i < typeParams.length && i < typeArgs.length; i++) {
    const param = typeParams[i];
    const arg = typeArgs[i];
    
    // Replace exact match (e.g., "T" -> "User")
    if (result === param) {
      return arg;
    }
    
    // Replace array type (e.g., "T[]" -> "User[]")
    if (result === `${param}[]`) {
      return `${arg}[]`;
    }
    
    // Replace in generic (e.g., "Array<T>" -> "Array<User>", "Map<K, V>" -> "Map<string, number>")
    // Use word boundary to avoid replacing partial matches
    const regex = new RegExp(`\\b${param}\\b`, 'g');
    result = result.replace(regex, arg);
  }
  
  return result;
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
  tjsSchemas?: Record<string, any>,
): SchemaBuilderContext => ({
  schemas: {},
  typeDefinitions: typeDefinitions || new Map(),
  enumDefinitions: enumDefinitions || new Map(),
  tjsSchemas,
});
