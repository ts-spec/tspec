import {
 BooleanSchemaObject, IntegerSchemaObject, NumberSchemaObject, ObjectSchemaObject, Schema, StringSchemaObject,
} from 'generator/types';
import { OpenAPIV3 } from 'openapi-types';
import { DefinitionOrBoolean } from 'typescript-json-schema';

export const isDefinitionBoolean = (defOrBool: DefinitionOrBoolean): defOrBool is boolean => {
 if (defOrBool === true || defOrBool === false) {
   return true;
 }
 return false;
};

export const isReferenceObject = (
 schema: Schema,
): schema is OpenAPIV3.ReferenceObject => {
 // eslint-disable-next-line no-prototype-builtins
 if (Object(schema).hasOwnProperty('$ref')) {
   return true;
 }
 return false;
};

export const isIntegerSchemaObject = (
 schema: Schema,
): schema is IntegerSchemaObject => {
 if (isReferenceObject(schema)) {
   return false;
 }
 if (schema.type && schema.type === 'integer') {
   return true;
 }
 return false;
};

export const isNumberSchemaObject = (
 schema: Schema,
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
 schema: Schema,
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
 schema: Schema,
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
 schema: Schema,
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
 schema: OpenAPIV3.SchemaObject,
): schema is OpenAPIV3.ArraySchemaObject => {
 if (isReferenceObject(schema)) {
   return false;
 }
 if (schema.type === 'array' && schema.items !== undefined) {
   return true;
 }
 return false;
};

export const isNullableObject = (schema: Schema) => {
 if (isReferenceObject(schema)) {
   return false;
 }
 if (Object.keys(schema).length === 1 && schema.nullable === true) {
   return true;
 }
 return false;
};

export function isEmptyObject(obj: Object) {
  if( Object.keys(obj).length === 0 ) return true; 

  for(const t of Object.values(obj)){
    if(t!== undefined) return false; 
  } 
  return true; 
}