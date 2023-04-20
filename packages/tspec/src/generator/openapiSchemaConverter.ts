// import convert from 'json-schema-to-openapi-schema'; // TODO: 이게 정말 필요한건지 체크 필요.
import * as TJS from 'typescript-json-schema';

import { convertDefinition } from './converter';
import { Schema, SchemaMapping } from './types';

export const convertToOpenapiSchemas = (
  jsonSchemas:{[key:string]:TJS.DefinitionOrBoolean},
) => {
  const schemaMapping: {[key:string]: Schema} = {};

  Object.entries(jsonSchemas).forEach(([key, val]) => {
    const convertedJsonSchemas = convertDefinition(val);
    if (!convertedJsonSchemas) return;

    schemaMapping[key.replace(/[^A-Za-z0-9_.-]/g, '_')] = convertedJsonSchemas;
  });
  return schemaMapping as SchemaMapping;
};
