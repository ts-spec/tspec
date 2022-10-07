import { OpenAPIV3 } from "openapi-types";
import { Tspec } from "../types/tspec";
import { assertNever } from '../utils';
import { determineTypesUsedInEnum, getValue, groupEnums, hasUndefined, isNull, removeDuplicateOpenApiTypes } from "./utils";

export const getOpenApiType = (type: Tspec.Type, title?: string): OpenAPIV3.SchemaObject => {
  if (
    type.typeName === 'void' || 
    type.typeName === 'undefined' || 
    type.typeName === 'never' || 
    type.typeName === 'any'
  ) {
    return {}
  } else if (type.typeName === 'boolean') {
    return { type: type.typeName };
  } else if (
    type.typeName === 'integer' ||
    type.typeName === 'number' ||
    type.typeName === 'string'
  ) {
    return { type: type.typeName, format: type.format };
  } else if (type.typeName === 'object') { // Tspec.ObjectsNoPropsType
    return { type: 'object', additionalProperties: true }
  } else if (type.typeName === 'array') {
    return getOpenApiTypeForArrayType(type, title);
  } else if (type.typeName === 'tuple') {
    return getOpenApiTypeForTupleType(type);
  } else if (type.typeName === 'intersection') {
    return getOpenApiTypeForIntersectionType(type, title);
  } else if (type.typeName === 'enum' || type.typeName === 'refEnum') {
    return getOpenApiTypeForEnumType(type, title);
  } else if (type.typeName === 'union') {
    return getOpenApiTypeForUnionType(type, title);
  } else if (type.typeName === 'nestedObjectLiteral' || type.typeName === 'refObject') {
    return getOpenApiTypeForObjectLiteral(type, title);
  } else if (type.typeName === 'refAlias') {
    return getOpenApiType(type.type);
  }
  return assertNever(type.typeName);
}

const getOpenApiTypeForArrayType = (arrayType: Tspec.ArrayType, title?: string): OpenAPIV3.SchemaObject => {
  return {
    type: 'array',
    items: getOpenApiType(arrayType.itemType, title),
  };
}

const getOpenApiTypeForTupleType = (tupleType: Tspec.TupleType, title?: string): OpenAPIV3.SchemaObject => {
  return {
    type: 'array',
    items: { // TODO: use prefixItems in OpenAPI 3.1. see https://stackoverflow.com/questions/57464633/how-to-define-a-json-array-with-concrete-item-definition-for-every-index-i-e-a
      oneOf: tupleType.types.map((itemType) => getOpenApiType(itemType, title)),
    },
    minItems: tupleType.types.length,
    maxItems: tupleType.types.length,
  }
}

const getOpenApiTypeForIntersectionType = (type: Tspec.IntersectionType, title?: string): OpenAPIV3.SchemaObject => {
  return { allOf: type.types.map(x => getOpenApiType(x)), ...(title && { title }) };
}

const getOpenApiTypeForEnumType = (enumType: Tspec.EnumType | Tspec.RefEnumType, title?: string): OpenAPIV3.SchemaObject => {
  const types = determineTypesUsedInEnum(enumType.enums);

  if (types.size === 1) {
    const type = types.values().next().value;
    const nullable = enumType.enums.some((e) => e === null) ? true : false;
    return { ...(title && { title }), type, enum: enumType.enums.map(member => getValue(type, member)), nullable };
  } else {
    const valuesDelimited = Array.from(types).join(',');
    throw new Error(`Enums can only have string or number values, but enum had ${valuesDelimited}`);
  }
}

const getOpenApiTypeForUnionType = (unionType: Tspec.UnionType, title?: string): OpenAPIV3.SchemaObject => {
  // Filter out nulls and undefineds
  const actualOpenApiTypes = removeDuplicateOpenApiTypes(
    groupEnums(
      unionType.types
        .filter((x) => !isNull(x))
        .filter((x) => x.typeName !== 'undefined')
        .map(x => getOpenApiType(x)),
    ),
  );
  const nullable = unionType.types.some(x => isNull(x));

  if (nullable) {
    if (actualOpenApiTypes.length === 1) {
      const [openApiType] = actualOpenApiTypes;
      // for ref union with null, use an allOf with a single
      // element since you can't attach nullable directly to a ref.
      // https://swagger.io/docs/specification/using-ref/#syntax
      // if (swaggerType.$ref) {
      //   return { allOf: [swaggerType], nullable };
      // }
      return { title, ...openApiType, nullable };
    } else {
      return { title, anyOf: actualOpenApiTypes, nullable };
    }
  } else {
    if (actualOpenApiTypes.length === 1) {
      return { title, ...actualOpenApiTypes[0] };
    } else {
      return { title, anyOf: actualOpenApiTypes };
    }
  }
}

const getOpenApiTypeForObjectLiteral = (objectLiteral: Tspec.ObjectType, title?: string): OpenAPIV3.SchemaObject => {
  const properties = buildProperties(objectLiteral.properties);
  const additionalProperties = objectLiteral.additionalProperties && getOpenApiType(objectLiteral.additionalProperties);
  const required = objectLiteral.properties.filter(prop => prop.required && !hasUndefined(prop)).map(prop => prop.name);

  return {
    title,
    properties,
    additionalProperties,
    required: required.length > 0 ? required : undefined,
    type: 'object',
  };
}

const buildProperties = (source: Tspec.Property[]) => {
  const properties: { [propertyName: string]: OpenAPIV3.SchemaObject } = {};

  source.forEach(property => {
    const openApiType = getOpenApiType(property.type);
    openApiType.description = property.description;
    openApiType.example = property.example;
    openApiType.format = property.format || openApiType.format;
    openApiType.deprecated = property.deprecated ? true : undefined;
    properties[property.name] = openApiType;
  });

  return properties;
}

