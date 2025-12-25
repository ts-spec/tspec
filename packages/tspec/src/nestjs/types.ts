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
}
