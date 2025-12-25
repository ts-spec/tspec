// Types for NestJS controller parsing

export interface NestControllerMetadata {
  name: string;
  path: string;
  filePath: string;
  methods: NestMethodMetadata[];
  tags?: string[]; // From @ApiTags decorator
}

export interface NestApiResponse {
  status: number;
  description?: string;
  type?: string;
}

export interface NestMethodMetadata {
  name: string;
  httpMethod: HttpMethod;
  path: string;
  parameters: NestParameterMetadata[];
  returnType: string;
  description?: string;
  summary?: string;
  tags?: string[];
  responses?: NestApiResponse[];
}

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'head';

export interface NestParameterMetadata {
  name: string;
  type: string;
  category: 'param' | 'query' | 'body' | 'headers' | 'file' | 'files';
  required: boolean;
  /** Field name for file upload (from FileInterceptor) */
  fieldName?: string;
  /** Whether this is a DTO type that should be expanded into individual parameters (for @Query() without field name) */
  isDto?: boolean;
}

export interface NestParserOptions {
  tsconfigPath: string;
  controllerGlobs: string[];
}

export interface ParsedNestApp {
  controllers: NestControllerMetadata[];
  imports: Map<string, string>; // typeName -> import path
  typeDefinitions: Map<string, TypeDefinition>; // typeName -> type definition
  enumDefinitions: Map<string, EnumDefinition>; // enumName -> enum definition
  /** TJS-generated schemas for all types (already resolved, no manual parsing needed) */
  tjsSchemas?: Record<string, any>;
}

export interface EnumDefinition {
  name: string;
  values: string[];
  description?: string;
}

export interface TypeDefinition {
  name: string;
  properties: PropertyDefinition[];
  description?: string;
  /**
   * Index signature type for Record<K, V>, Map<K, V>, or { [key: string]: T }
   * TODO(cleanup): This field can be removed once TJS is fully integrated.
   * @deprecated - Will be removed when TJS fallback is no longer needed
   */
  indexSignature?: {
    keyType: string;
    valueType: string;
  };
  /**
   * Type parameter names for generic types (e.g., ['T'] for DataResponse<T>, ['K', 'V'] for Map<K, V>)
   * TODO(cleanup): This field can be removed once TJS is fully integrated.
   * @deprecated - Will be removed when TJS fallback is no longer needed
   */
  typeParameters?: string[];
}

export interface PropertyDefinition {
  name: string;
  type: string;
  required: boolean;
  description?: string;
  isArray?: boolean;
  enumValues?: string[];
  example?: unknown;
  format?: string;
  deprecated?: boolean;
  nullable?: boolean;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  default?: unknown;
  /**
   * Index signature for Record<K, V>, Map<K, V>, or { [key: string]: T } properties
   * TODO(cleanup): This field can be removed once TJS is fully integrated.
   * @deprecated - Will be removed when TJS fallback is no longer needed
   */
  indexSignature?: {
    keyType: string;
    valueType: string;
  };
}
