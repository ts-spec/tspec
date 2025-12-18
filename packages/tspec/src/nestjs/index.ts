import type { OpenAPIV3 } from 'openapi-types';
import { parseNestControllers } from './parser';
import { generateOpenApiFromNest } from './openapiGenerator';
import type { GenerateOpenApiOptions } from './openapiGenerator';
import type { NestParserOptions } from './types';

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
export type { GenerateOpenApiOptions } from './openapiGenerator';

/**
 * Options for generating OpenAPI spec from NestJS controllers
 */
export interface GenerateNestTspecOptions {
  /** Path to tsconfig.json */
  tsconfigPath?: string;
  /** Glob patterns for controller files */
  controllerGlobs?: string[];
  /** OpenAPI document options */
  openapi?: GenerateOpenApiOptions;
}

/**
 * Generate OpenAPI spec from NestJS controllers programmatically
 * 
 * @example
 * ```typescript
 * import { generateNestTspec } from 'tspec';
 * 
 * const spec = generateNestTspec({
 *   tsconfigPath: './tsconfig.json',
 *   controllerGlobs: ['src/**\/*.controller.ts'],
 *   openapi: {
 *     title: 'My API',
 *     version: '1.0.0',
 *   },
 * });
 * ```
 */
export const generateNestTspec = (options: GenerateNestTspecOptions = {}): OpenAPIV3.Document => {
  const parserOptions: NestParserOptions = {
    tsconfigPath: options.tsconfigPath || './tsconfig.json',
    controllerGlobs: options.controllerGlobs || ['src/**/*.controller.ts'],
  };

  const app = parseNestControllers(parserOptions);
  return generateOpenApiFromNest(app, options.openapi || {});
};
