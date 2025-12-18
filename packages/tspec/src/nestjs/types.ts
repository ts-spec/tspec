// Types for NestJS controller parsing

export interface NestControllerMetadata {
  name: string;
  path: string;
  filePath: string;
  methods: NestMethodMetadata[];
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
}

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'head';

export interface NestParameterMetadata {
  name: string;
  type: string;
  category: 'param' | 'query' | 'body' | 'headers';
  required: boolean;
}

export interface NestParserOptions {
  tsconfigPath: string;
  controllerGlobs: string[];
}

export interface ParsedNestApp {
  controllers: NestControllerMetadata[];
  imports: Map<string, string>; // typeName -> import path
}
