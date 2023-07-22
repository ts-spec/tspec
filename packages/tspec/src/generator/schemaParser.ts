import { OpenAPIV3 } from 'openapi-types';

import { Schema, SchemaMapping } from './types';

export const accessSchema = (
  obj: Schema | undefined,
  schemas: SchemaMapping,
): OpenAPIV3.SchemaObject | undefined => {
  if (!obj) {
    return undefined;
  }
  if ('$ref' in obj) {
    const [, schemaName] = obj.$ref.split('#/components/schemas/');
    return schemas[schemaName];
  }
  return obj;
};

export const accessProperty = (
  obj: Schema | undefined,
  key: string,
  schemas: SchemaMapping,
): Schema | undefined => {
  const schema = accessSchema(obj, schemas);
  if (!schema) {
    return undefined;
  }
  const combinedSchema = schema.allOf || schema.oneOf || schema.anyOf;
  if (combinedSchema) {
    return combinedSchema.map((o) => accessProperty(o, key, schemas)).find((o) => o);
  }
  const value = schema.properties?.[key];
  return value && accessSchema(value, schemas);
};

export const getPropertyByPath = (
  obj: Schema | undefined,
  path: string,
  schemas: SchemaMapping,
): Schema | undefined => {
  const [first, ...rest] = path.split('.');
  const firstValue = accessProperty(obj, first, schemas);
  if (rest.length === 0) {
    return firstValue;
  }
  return getPropertyByPath(firstValue, rest.join('.'), schemas);
};

const getText = (obj: Schema | undefined): string | undefined => {
  if (!obj || '$ref' in obj || obj.type !== 'string' || obj.enum?.length !== 1) {
    return undefined;
  }
  return obj.enum[0];
};

export const getTextPropertyByPath = <O extends { required: boolean }>(
  obj: Schema, path: string, schemas: SchemaMapping, options?: O,
): O extends { required: true } ? string : string | undefined => {
  const text = getText(getPropertyByPath(obj, path, schemas));
  if (options?.required === true && !text) {
    throw new Error(`Invalid '${path}' in ApiSpec`);
  }
  return text as string;
};

export const getTextListPropertyByPath = (
  obj: Schema,
  path: string,
  schemas: SchemaMapping,
  options?: { required: boolean },
): string[] => {
  const value = getPropertyByPath(obj, path, schemas);
  if (!value || '$ref' in value || value.type !== 'array' || !value.items) {
    if (options?.required === true) {
      throw new Error(`Invalid '${path}' in ApiSpec`);
    }
    return [];
  }
  return (value.items as Schema[])
    .map((item) => getText(item)).filter((item): item is string => !!item);
};

export const getObjectPropertyByPath = <O extends { required: boolean }>(
  obj: Schema, path: string, schemas: SchemaMapping, options?: O,
) => {
  const value = getPropertyByPath(obj, path, schemas);
  if (!value || '$ref' in value || value.type !== 'object' || !value.properties) {
    if (options?.required === true) {
      throw new Error(
        `Invalid '${path}' in ${JSON.stringify(obj)}; value: ${JSON.stringify(value)}`,
      );
    }
    return undefined;
  }
  return { ...value, properties: value.properties };
};
