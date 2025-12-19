import type { OpenAPIV3 } from 'openapi-types';
import { parseNestControllers } from './parser';
import { generateOpenApiFromNest } from './openapiGenerator';
import type { NestParserOptions } from './types';
import type { Tspec } from '../types/tspec';

export { parseNestControllers } from './parser';
export { generateOpenApiFromNest } from './openapiGenerator';
export type {
  NestControllerMetadata,
  NestMethodMetadata,
  NestParameterMetadata,
  NestParserOptions,
  ParsedNestApp,
  HttpMethod,
} from './types';

/**
 * Generate OpenAPI spec from NestJS controllers programmatically
 * 
 * @example
 * ```typescript
 * import { generateNestTspec } from 'tspec';
 * 
 * const spec = generateNestTspec({
 *   tsconfigPath: './tsconfig.json',
 *   specPathGlobs: ['src/**\/*.controller.ts'],
 *   openapi: {
 *     title: 'My API',
 *     version: '1.0.0',
 *   },
 * });
 * ```
 */
export const generateNestTspec = (options: Tspec.GenerateParams = {}): OpenAPIV3.Document => {
  const parserOptions: NestParserOptions = {
    tsconfigPath: options.tsconfigPath || './tsconfig.json',
    controllerGlobs: options.specPathGlobs || ['src/**/*.controller.ts'],
  };

  const app = parseNestControllers(parserOptions);
  return generateOpenApiFromNest(app, {
    title: options.openapi?.title,
    version: options.openapi?.version,
    description: options.openapi?.description,
    servers: options.openapi?.servers,
    securitySchemes: options.openapi?.securityDefinitions,
  });
};
