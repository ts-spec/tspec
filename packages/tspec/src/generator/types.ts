import { OpenAPIV3 } from 'openapi-types';

export type Schema = OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject;
export type SchemaMapping = Record<string, OpenAPIV3.SchemaObject>;

export interface NumberSchemaObject extends OpenAPIV3.NonArraySchemaObject {
  type: 'number',
}

export interface StringSchemaObject extends OpenAPIV3.NonArraySchemaObject {
  type: 'string',
}

export interface IntegerSchemaObject extends OpenAPIV3.NonArraySchemaObject {
  type: 'integer',
}

export interface BooleanSchemaObject extends OpenAPIV3.NonArraySchemaObject {
  type: 'boolean',
}

export interface ObjectSchemaObject extends OpenAPIV3.NonArraySchemaObject {
  type: 'object',
  properties: {
    [name: string]: Schema,
  },
}
