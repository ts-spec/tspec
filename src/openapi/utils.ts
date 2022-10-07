import { OpenAPIV3 } from "openapi-types";
import { Tspec } from "../types/tspec";

export const getValue = (type: 'string' | 'number' | 'integer' | 'boolean', member: unknown): string | number | boolean | null => {
  if (member === null) {
    return null;
  }

  switch (type) {
    case 'integer':
    case 'number':
      return Number(member);
    case 'boolean':
      return !!member;
    case 'string':
    default:
      return String(member);
  }
}

export const determineTypesUsedInEnum = (anEnum: Array<string | number | boolean | null>) => {
  const typesUsedInEnum = anEnum.reduce((theSet, curr) => {
    const typeUsed = curr === null ? 'number' : (typeof curr as 'string' | 'number' | 'boolean');
    theSet.add(typeUsed);
    return theSet;
  }, new Set<'string' | 'number' | 'boolean'>());

  return typesUsedInEnum;
}

export const removeDuplicateOpenApiTypes = (types: Array<OpenAPIV3.SchemaObject>): Array<OpenAPIV3.SchemaObject> => {
  if (types.length === 1) {
    return types;
  } else {
    const typesSet = new Set<string>();
    for (const type of types) {
      typesSet.add(JSON.stringify(type));
    }
    return Array.from(typesSet).map(typeString => JSON.parse(typeString));
  }
}


export const isNull = (type: Tspec.Type) => {
  return type.typeName === 'enum' && type.enums.length === 1 && type.enums[0] === null;
}

/**
 * Join disparate enums with the same type into one.
 * grouping enums is helpful because it makes the spec more readable and it
 * bypasses a failure in openapi-generator caused by using anyOf with
 * duplicate types.
 */ 
export const groupEnums = (types: Array<OpenAPIV3.SchemaObject>) => {
  const returnTypes: Array<OpenAPIV3.SchemaObject> = [];
  const enumValuesByType: any = {}; // FIXME any
  for (const type of types) {
    if (type.enum && type.type) {
      for (const enumValue of type.enum) {
        if (!enumValuesByType[type.type]) {
          enumValuesByType[type.type] = [];
        }
        enumValuesByType[type.type][enumValue] = enumValue;
      }
    }
    // preserve non-enum types
    else {
      returnTypes.push(type);
    }
  }

  Object.keys(enumValuesByType).forEach(dataType =>
    returnTypes.push({
      type: dataType as any, // FIXME any
      enum: Object.values(enumValuesByType[dataType]),
    }),
  );

  return returnTypes;
}

export const hasUndefined = (property: Tspec.Property): boolean => {
  return property.type.typeName === 'undefined' || (property.type.typeName === 'union' && property.type.types.some(type => type.typeName === 'undefined'));
}

