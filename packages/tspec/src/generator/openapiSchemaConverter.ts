// import convert from 'json-schema-to-openapi-schema'; // TODO: 이게 정말 필요한건지 체크 필요.
import * as TJS from 'typescript-json-schema';

import { convertDefinition } from './converter';
import { Schema, SchemaMapping } from './types';

export const convertToOpenapiSchemas = async (
  jsonSchemas:{[key:string]:TJS.DefinitionOrBoolean},
): Promise<SchemaMapping> => {
  const schemaMapping: {[key:string]: Schema} = {};

  await Promise.all(Object.entries(jsonSchemas).map(async ([key, val]) => {
    const convertedJsonSchemas = await convertDefinition(val);
    if (!convertedJsonSchemas) return;

    schemaMapping[key.replace(/[^A-Za-z0-9_.-]/g, '_')] = convertedJsonSchemas;
  }));
  return schemaMapping as SchemaMapping;
};
