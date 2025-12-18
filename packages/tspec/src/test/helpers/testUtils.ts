import path from 'path';
import fs from 'fs/promises';
import { OpenAPIV3 } from 'openapi-types';
import { generateTspec } from '../../generator';
import { Tspec } from '../../types/tspec';

export interface TestScenario {
  name: string;
  specPath: string;
  tsconfigPath?: string;
}

/**
 * Generate OpenAPI spec from a test scenario
 */
export async function generateSpecFromScenario(
  scenarioDir: string,
  options?: Partial<Tspec.GenerateParams>,
): Promise<OpenAPIV3.Document> {
  const specPath = path.join(scenarioDir, '*.ts');
  const tsconfigPath = path.join(scenarioDir, 'tsconfig.json');
  
  const hasTsconfig = await fs.access(tsconfigPath).then(() => true).catch(() => false);
  
  return generateTspec({
    specPathGlobs: [specPath],
    tsconfigPath: hasTsconfig ? tsconfigPath : path.join(__dirname, '../../../tsconfig.json'),
    ignoreErrors: true,
    ...options,
  });
}

/**
 * Load expected OpenAPI spec from JSON file
 */
export async function loadExpectedSpec(scenarioDir: string): Promise<OpenAPIV3.Document> {
  const expectedPath = path.join(scenarioDir, 'expected.json');
  const content = await fs.readFile(expectedPath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Deep compare two objects, ignoring specified keys
 */
export function deepCompare(
  actual: any,
  expected: any,
  ignoreKeys: string[] = ['operationId'],
  path: string = '',
): { isEqual: boolean; differences: string[] } {
  const differences: string[] = [];

  if (typeof actual !== typeof expected) {
    differences.push(`${path}: type mismatch - actual: ${typeof actual}, expected: ${typeof expected}`);
    return { isEqual: false, differences };
  }

  if (actual === null || expected === null) {
    if (actual !== expected) {
      differences.push(`${path}: null mismatch - actual: ${actual}, expected: ${expected}`);
    }
    return { isEqual: actual === expected, differences };
  }

  if (typeof actual !== 'object') {
    if (actual !== expected) {
      differences.push(`${path}: value mismatch - actual: ${JSON.stringify(actual)}, expected: ${JSON.stringify(expected)}`);
    }
    return { isEqual: actual === expected, differences };
  }

  if (Array.isArray(actual) !== Array.isArray(expected)) {
    differences.push(`${path}: array mismatch - actual isArray: ${Array.isArray(actual)}, expected isArray: ${Array.isArray(expected)}`);
    return { isEqual: false, differences };
  }

  if (Array.isArray(actual)) {
    if (actual.length !== expected.length) {
      differences.push(`${path}: array length mismatch - actual: ${actual.length}, expected: ${expected.length}`);
    }
    const maxLen = Math.max(actual.length, expected.length);
    for (let i = 0; i < maxLen; i++) {
      const result = deepCompare(actual[i], expected[i], ignoreKeys, `${path}[${i}]`);
      differences.push(...result.differences);
    }
    return { isEqual: differences.length === 0, differences };
  }

  const actualKeys = Object.keys(actual).filter(k => !ignoreKeys.includes(k));
  const expectedKeys = Object.keys(expected).filter(k => !ignoreKeys.includes(k));

  const allKeys = new Set([...actualKeys, ...expectedKeys]);

  for (const key of allKeys) {
    if (!actualKeys.includes(key)) {
      differences.push(`${path}.${key}: missing in actual`);
      continue;
    }
    if (!expectedKeys.includes(key)) {
      differences.push(`${path}.${key}: extra in actual`);
      continue;
    }
    const result = deepCompare(actual[key], expected[key], ignoreKeys, `${path}.${key}`);
    differences.push(...result.differences);
  }

  return { isEqual: differences.length === 0, differences };
}

/**
 * Assert that a schema matches expected structure
 */
export function assertSchemaEquals(
  actual: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined,
  expected: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined,
  message?: string,
): void {
  const result = deepCompare(actual, expected, []);
  if (!result.isEqual) {
    const errorMessage = message 
      ? `${message}\nDifferences:\n${result.differences.join('\n')}`
      : `Schema mismatch:\n${result.differences.join('\n')}`;
    throw new Error(errorMessage);
  }
}

/**
 * Get schema from components by name
 */
export function getComponentSchema(
  doc: OpenAPIV3.Document,
  schemaName: string,
): OpenAPIV3.SchemaObject | undefined {
  return doc.components?.schemas?.[schemaName] as OpenAPIV3.SchemaObject | undefined;
}

/**
 * Get path operation from document
 */
export function getPathOperation(
  doc: OpenAPIV3.Document,
  pathUrl: string,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'head',
): OpenAPIV3.OperationObject | undefined {
  return doc.paths?.[pathUrl]?.[method as OpenAPIV3.HttpMethods];
}

/**
 * Get response schema from operation
 */
export function getResponseSchema(
  operation: OpenAPIV3.OperationObject,
  statusCode: string = '200',
): OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined {
  const response = operation.responses?.[statusCode] as OpenAPIV3.ResponseObject | undefined;
  return response?.content?.['application/json']?.schema;
}

/**
 * Get request body schema from operation
 */
export function getRequestBodySchema(
  operation: OpenAPIV3.OperationObject,
): OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined {
  const requestBody = operation.requestBody as OpenAPIV3.RequestBodyObject | undefined;
  return requestBody?.content?.['application/json']?.schema;
}

/**
 * Get parameter from operation by name and location
 */
export function getParameter(
  operation: OpenAPIV3.OperationObject,
  name: string,
  inLocation: 'query' | 'path' | 'header' | 'cookie',
): OpenAPIV3.ParameterObject | undefined {
  const params = operation.parameters as OpenAPIV3.ParameterObject[] | undefined;
  return params?.find(p => p.name === name && p.in === inLocation);
}
