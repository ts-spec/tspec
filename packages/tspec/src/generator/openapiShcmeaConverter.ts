import convert from 'json-schema-to-openapi-schema'; // TODO: 이게 정말 필요한건지 체크 필요.
import * as TJS from 'typescript-json-schema';

import { SchemaMapping } from './types';

const isSchemaNullableOnly = (s: any) => (
  Object.keys(s).filter((key) => s[key] !== undefined).length === 1 && s.nullable
);

const convertCombinedNullableInner = (schema: any, field: 'anyOf' | 'oneOf') => {
  const types = schema[field] || [];
  const nullable = types.some((s: any) => isSchemaNullableOnly(s)) || undefined;
  return {
    ...schema,
    [field]: types.filter((s: any) => !isSchemaNullableOnly(s)),
    nullable,
  };
};

/** NOTE(hyeonseong): when anyOf or oneOf contains null, it should be nullable. */
const handleCombinedNullable = (schema: any): any => { // TODO: fix types
  if (schema.anyOf) {
    return convertCombinedNullableInner(schema, 'anyOf');
  }
  if (schema.oneOf) {
    return convertCombinedNullableInner(schema, 'oneOf');
  }
  return schema;
};

const convertToNullableSchema = (schema: any): any => {
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
  return schema;
};

const handleExamples = (schema: any): any => { // TODO: fix types
  if (schema.examples) {
    const { examples, ...rest } = schema;
    return {
      ...rest,
      example: Array.isArray(examples) ? examples[0] : examples,
    };
  }
  return schema;
};

const handleConst = (schema: any): any => { // TODO: fix types
  if (schema.const) {
    const { const: c, ...rest } = schema;
    return {
      ...rest,
      enum: [c],
    };
  }
  return schema;
};

const handleDeprecated = (schema: any): any => { // TODO: fix types
  if (schema.deprecated !== undefined && schema.deprecated !== false) {
    const { deprecated, ...rest } = schema;
    return {
      ...rest,
      deprecated: true,
    };
  }
  return schema;
};

const convertToOpenapiTypes = (schema: any): any => { // TODO: fix types
  if (Array.isArray(schema)) {
    return schema.map((s) => convertToOpenapiTypes(s));
  }
  if (schema && typeof schema === 'object') {
    const nullableSchema = convertToNullableSchema(schema);
    const convertedSchema = Object.fromEntries(
      Object.entries(nullableSchema).map(([key, value]) => [key, convertToOpenapiTypes(value)]),
    );
    const handlers = [handleCombinedNullable, handleExamples, handleConst, handleDeprecated];
    return handlers.reduce((acc, handler) => handler(acc), convertedSchema);
  }
  return schema;
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

export const convertToOpenapiSchemas = async (
  jsonSchemas: TJS.Definition,
): Promise<SchemaMapping> => {
  const convertedJsonSchemas = convertToOpenapiTypes(jsonSchemas);
  const openapiSchemas = await convert(convertedJsonSchemas) as SchemaMapping;
  return escapeSchemaNames(openapiSchemas);
};
