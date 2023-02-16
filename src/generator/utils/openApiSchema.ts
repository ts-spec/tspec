import { OpenAPIV3 as oapi3 } from 'openapi-types';

export type oapiSchema = oapi3.SchemaObject | oapi3.ReferenceObject;

export interface NumberSchemaObject extends oapi3.NonArraySchemaObject {
  type: 'number',
}

export interface StringSchemaObject extends oapi3.NonArraySchemaObject {
  type: 'string',
}

export interface IntegerSchemaObject extends oapi3.NonArraySchemaObject {
  type: 'integer',
}

export interface BooleanSchemaObject extends oapi3.NonArraySchemaObject {
  type: 'boolean',
}

export interface ObjectSchemaObject extends oapi3.NonArraySchemaObject {
  type: 'object',
  properties: {
    [name: string]: oapi3.ReferenceObject | oapi3.SchemaObject,
  },
}

export const isIntegerSchemaObject = (
  schema: oapiSchema,
): schema is IntegerSchemaObject => {
  if (isReferenceObject(schema)) {
    return false;
  }
  if (schema.type === 'integer') {
    return true;
  }
  return false;
};

export const isNumberSchemaObject = (
  schema: oapiSchema,
): schema is NumberSchemaObject => {
  if (isReferenceObject(schema)) {
    return false;
  }
  if (schema.type === 'number') {
    return true;
  }
  return false;
};

export const isBooleanSchemaObject = (
  schema: oapiSchema,
): schema is BooleanSchemaObject => {
  if (isReferenceObject(schema)) {
    return false;
  }
  if (schema.type === 'boolean') {
    return true;
  }
  return false;
};

export const isStringSchemaObject = (
  schema: oapiSchema,
): schema is StringSchemaObject => {
  if (isReferenceObject(schema)) {
    return false;
  }
  if (schema.type === 'string') {
    return true;
  }
  return false;
};

export const isObjectSchemaObject = (
  schema: oapiSchema,
): schema is ObjectSchemaObject => {
  if (isReferenceObject(schema)) {
    return false;
  }
  if (schema.type === 'object' && schema.properties !== undefined) {
    return true;
  }
  return false;
};

export const isArraySchemaObject = (
  schema: oapi3.SchemaObject,
): schema is oapi3.ArraySchemaObject => {
  if (isReferenceObject(schema)) {
    return false;
  }
  if (schema.type === 'array' && schema.items !== undefined) {
    return true;
  }
  return false;
};

export const isReferenceObject = (
  schema: oapiSchema,
): schema is oapi3.ReferenceObject => {
  if (Object.prototype.hasOwnProperty('$ref')) {
    return true;
  }
  return false;
};

export const isNullableObject = (schema: oapiSchema) => {
  if (isReferenceObject(schema)) {
    return false;
  }
  if (Object.keys(schema).length === 1 && schema.nullable === true) {
    return true;
  }
  return false;
};
