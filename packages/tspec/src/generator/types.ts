import { OpenAPIV3 } from 'openapi-types';

export type Schema = OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject;
export type SchemaMapping = Record<string, OpenAPIV3.SchemaObject>;
