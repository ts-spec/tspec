import { OpenAPIV3 as oapi3 } from 'openapi-types';
import * as tjs from 'typescript-json-schema';

import { isConcrete, isDefinitionBoolean, isNullableObject, isReferenceObject, oapiSchema  } from './utils';

// $ref를 대체하려면 dependency graph 그려야함

const createItem = async (items: tjs.DefinitionOrBoolean[]) => {
  let nullable = false;
  const schema = await Promise.all(
    items.map(async (item) => {
      const convertedItem = await convertDefinition(item);
      if (convertedItem && isNullableObject(convertedItem)) {
        nullable = true;
        return undefined;
      }
      return convertedItem;
    }),
  );

  const nullableProperty = nullable ? { nullable } : {};

  const filteredSchema = schema.filter(isConcrete);
  if (filteredSchema.length === 0) {
    return nullableProperty;
  } else if (filteredSchema.length === 1) {
    if (isReferenceObject(filteredSchema[0]) && nullable) {
      return {
        anyOf: [filteredSchema[0], nullableProperty],
      };
    }
    return {
      ...filteredSchema[0],
      ...nullableProperty,
    };
  } else if (filteredSchema.length > 1) {
    return {
      anyOf: filteredSchema,
      ...nullableProperty,
    };
  }
};

export const filterNullObject = (schema: oapiSchema | undefined) => {
  if (!schema) {
    return false;
  }
  if (isNullableObject(schema)) {
    return false;
  }
  return true;
};
const convertItems = async (
  items: tjs.DefinitionOrBoolean | tjs.DefinitionOrBoolean[],
) => {
  if (!Array.isArray(items)) {
    return convertDefinition(items);
  }

  if (items.length === 1) {
    return convertDefinition(items[0]);
  }

  return createItem(items);
};

export const convertProperties = async (obj: {
  [key: string]: tjs.DefinitionOrBoolean;
}) => {
  const convertedObj: { [key: string]: oapiSchema } = {};
  for await (const [key, val] of Object.entries(obj)) {
    const convertedProperty = await convertDefinition(val);
    if (convertedProperty) {
      convertedObj[key] = convertedProperty;
    }
  }
  return convertedObj;
};

// oneOf 체크 
const convertSchemaArray = async (
  defs: tjs.DefinitionOrBoolean[],
  property: 'anyOf' | 'oneOf' | 'allOf',
) => {
  let schema: oapiSchema = {};
  let nullable = false;

  const object: oapiSchema = { type: 'object', properties: {} };

  const filteredDefs = await Promise.all(
    defs.map(async (def) => {
      const convertedDef = await convertDefinition(def);
      if (!convertedDef) {
        return undefined;
      }
      if (isNullableObject(convertedDef)) {
        nullable = true;
        return undefined;
      }
      if (property === 'allOf') {
        //다 합하기
        if (
          !isReferenceObject(convertedDef) &&
          convertedDef.type === 'object'
        ) {
          object['properties'] = {
            ...object['properties'],
            ...convertedDef['properties'],
          };
          return undefined;
        }
      }
      return convertedDef;
    }),
  );

  const convertedSchema = filteredDefs.filter(isConcrete);
  if (object.properties && Object.keys(object.properties).length > 0) {
    convertedSchema.push(object);
  }

  if (convertedSchema.length === 1) {
    const onlySchema = convertedSchema[0];
    if (isReferenceObject(onlySchema) && nullable) {
      schema[property] = [onlySchema, { nullable }];
    } else {
      schema = onlySchema;
    }
  } else if (convertedSchema.length > 1) {
    schema[property] = convertedSchema;
  }

  if (!isReferenceObject(schema)) {
    if (nullable) {
      schema['nullable'] = true;
    }
  }

  return schema;
};

export const extractSubschemaProperty = async (
  def: tjs.Definition,
): Promise<
  Pick<oapi3.BaseSchemaObject, 'allOf' | 'anyOf' | 'oneOf' | 'not'>
> => {
  const { allOf, oneOf, anyOf, not } = def;
  let schema: oapi3.BaseSchemaObject = {};

  if (allOf) {
    //다 Object일 경우?
    const convertedSchemaArray = await convertSchemaArray(allOf, 'allOf');
    schema = { ...schema, ...convertedSchemaArray };
  }

  if (oneOf) {
    const convertedSchemaArray = await convertSchemaArray(oneOf, 'oneOf');
    schema = { ...schema, ...convertedSchemaArray };
  }

  if (anyOf) {
    const convertedSchemaArray = await convertSchemaArray(anyOf, 'anyOf');
    schema = { ...schema, ...convertedSchemaArray };
  }

  if (not) {
    schema['not'] = await convertDefinition(not);
  }

  return schema;
};

export const extractCommonProperty = (
  def: tjs.Definition,
): Pick<
  oapi3.BaseSchemaObject,
  'title' | 'enum' | 'example' | 'description' | 'format' | 'default'
> => {
  const {
    title,
    enum: _enum,
    examples,
    description,
    format,
    default: _default,
  } = def;
  return {
    title,
    enum: _enum,
    example: examples,
    description,
    format,
    default: _default,
  };
};

const covertToBooleanSchemaObject = async (
  def: tjs.Definition,
): Promise<oapi3.SchemaObject> => {
  return {
    type: 'boolean',
  };
};

const covertToNumberSchemaObject = async (
  def: tjs.Definition,
  type: 'number' | 'integer' = 'number',
): Promise<oapi3.SchemaObject> => {
  const { multipleOf, maximum, exclusiveMaximum, exclusiveMinimum, minimum } =
    def;
  return {
    type,
    multipleOf,
    maximum: maximum !== undefined ? maximum : exclusiveMaximum,
    exclusiveMaximum: exclusiveMaximum !== undefined ? true : undefined,
    minimum: minimum !== undefined ? minimum : exclusiveMinimum,
    exclusiveMinimum: exclusiveMinimum !== undefined ? true : undefined,
  };
};

const covertToStringSchemaObject = async (
  def: tjs.Definition,
): Promise<oapi3.SchemaObject> => {
  const { maxLength, minLength, pattern } = def;

  if (pattern) {
    const isValidRegExp = RegExp.prototype.test(pattern);
    if (!isValidRegExp) {
      throw Error(`${pattern} is not valid RegExp`);
    }
  }

  return {
    type: 'string',
    maxLength,
    minLength,
  };
};

const covertToArraySchemaObject = async (
  def: tjs.Definition,
): Promise<oapi3.ArraySchemaObject> => {
  const { items, maxItems, minItems, uniqueItems } = def; //additionalItems, contains 제외

  const convertedItems = items ? await convertItems(items) : undefined;

  if (!convertedItems) {
    throw Error('array type need items');
  }

  return {
    type: 'array',
    items: convertedItems,
    maxItems,
    minItems,
    uniqueItems,
  };
};

const covertToObjectSchemaObject = async (
  def: tjs.Definition,
): Promise<oapi3.SchemaObject> => {
  const commonSchema = extractCommonProperty(def);
  //dependencies, patternProperties 제외
  //propertyNames 보류
  const {
    maxProperties,
    minProperties,
    required,
    properties,
    additionalProperties,
    propertyNames,
  } = def;

  const convertedAdditionalProperties = additionalProperties
    ? await convertDefinition(additionalProperties)
    : undefined;
  const convertedProperties = properties
    ? await convertProperties(properties)
    : undefined;

  return {
    type: 'object',
    maxProperties,
    minProperties,
    required,
    properties: convertedProperties,
    additionalProperties: convertedAdditionalProperties,
    ...commonSchema,
  };
};

const convertSchemaObjectByType = async (type: string, def: tjs.Definition) => {
  if (type === 'number' || type === 'integer') {
    return covertToNumberSchemaObject(def, type);
  } else if (type === 'string') {
    return covertToStringSchemaObject(def);
  } else if (type === 'object') {
    return covertToObjectSchemaObject(def);
  } else if (type === 'array') {
    return covertToArraySchemaObject(def);
  } else if (type === 'boolean') {
    return covertToBooleanSchemaObject(def);
  } else {
    return { nullable: true };
  }
};

const convertType = async (
  def: tjs.Definition,
  commonSchema: oapiSchema,
): Promise<oapiSchema> => {
  const types = def.type
    ? Array.isArray(def.type)
      ? def.type
      : [def.type]
    : [];

  let nullable = false;

  const splitedSchemas = await Promise.all(
    types.map(async (type) => {
      if (type === 'null') {
        nullable = true;
        return undefined;
      }
      const ret = await convertSchemaObjectByType(type, def);
      return ret;
    }),
  );

  const nullableProperty = nullable ? { nullable } : {};

  const refinedSchemas = splitedSchemas
    .filter(isConcrete)
    .map((schema) => ({ ...schema, ...commonSchema }));

  const referenceObject = def.$ref
    ? {
        $ref: def.$ref.replace(
          /(#\/definitions\/)(\w)/,
          '#/components/schemas/$2',
        ),
      }
    : undefined;
  if (referenceObject) {
    refinedSchemas.push(referenceObject);
  }

  if (refinedSchemas.length === 0) {
    return {
      ...commonSchema,
      ...nullableProperty,
    };
  } else if (refinedSchemas.length === 1) {
    const onlySchema = refinedSchemas[0];

    if (isReferenceObject(onlySchema)) {
      const baseSchema = { ...commonSchema, ...nullableProperty };
      if (Object.keys(baseSchema).length > 0) {
        return {
          allOf: [baseSchema, onlySchema],
        };
      }
      return onlySchema;
    }

    return {
      ...onlySchema,
      ...nullableProperty,
    };
  } else {
    return {
      anyOf: refinedSchemas,
      ...nullableProperty,
    };
  }
};

export const convertDefinition = async (
  def: tjs.DefinitionOrBoolean,
): Promise<oapiSchema | undefined> => {
  if (isDefinitionBoolean(def)) {
    return undefined;
  }
  const commonProperty = extractCommonProperty(def);
  const subschemaProperty = await extractSubschemaProperty(def);

  const commonSchema = {
    ...commonProperty,
    ...subschemaProperty,
  };

  return convertType(def, commonSchema);
};
