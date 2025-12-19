import { describe, it, expect, beforeAll } from 'vitest';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { OpenAPIV3 } from 'openapi-types';
import { generateTspec } from '../generator';
import {
  deepCompare,
  getComponentSchema,
  getPathOperation,
  getParameter,
  getResponseSchema,
  getRequestBodySchema,
} from './helpers/testUtils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCENARIOS_DIR = path.join(__dirname, 'scenarios');

interface TestScenario {
  name: string;
  dir: string;
}

async function getScenarios(): Promise<TestScenario[]> {
  const entries = await fs.readdir(SCENARIOS_DIR, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => ({
      name: entry.name,
      dir: path.join(SCENARIOS_DIR, entry.name),
    }));
}

async function generateSpec(scenarioDir: string): Promise<OpenAPIV3.Document> {
  const specPath = path.join(scenarioDir, 'spec.ts');
  return generateTspec({
    specPathGlobs: [specPath],
    tsconfigPath: path.join(__dirname, '../../tsconfig.json'),
    ignoreErrors: true,
    silent: true,
  });
}

async function loadExpected(scenarioDir: string): Promise<any> {
  const expectedPath = path.join(scenarioDir, 'expected.json');
  const content = await fs.readFile(expectedPath, 'utf-8');
  return JSON.parse(content);
}

describe('Tspec Schema Generation', () => {
  describe('Basic Types', () => {
    let spec: OpenAPIV3.Document;

    beforeAll(async () => {
      spec = await generateSpec(path.join(SCENARIOS_DIR, 'basic-types'));
    }, 30000);

    it('should generate User schema with correct properties', () => {
      const userSchema = getComponentSchema(spec, 'User');
      expect(userSchema).toBeDefined();
      expect(userSchema?.type).toBe('object');
      expect(userSchema?.properties).toHaveProperty('id');
      expect(userSchema?.properties).toHaveProperty('name');
      expect(userSchema?.properties).toHaveProperty('email');
      expect(userSchema?.properties).toHaveProperty('isActive');
    });

    it('should mark required fields correctly', () => {
      const userSchema = getComponentSchema(spec, 'User');
      expect(userSchema?.required).toContain('id');
      expect(userSchema?.required).toContain('name');
      expect(userSchema?.required).toContain('isActive');
      expect(userSchema?.required).not.toContain('email');
    });

    it('should generate correct property types', () => {
      const userSchema = getComponentSchema(spec, 'User') as any;
      expect(userSchema?.properties?.id?.type).toBe('number');
      expect(userSchema?.properties?.name?.type).toBe('string');
      expect(userSchema?.properties?.email?.type).toBe('string');
      expect(userSchema?.properties?.isActive?.type).toBe('boolean');
    });

    it('should generate GET /users endpoint', () => {
      const operation = getPathOperation(spec, '/users', 'get');
      expect(operation).toBeDefined();
      expect(operation?.summary).toBe('Get all users');
    });

    it('should generate POST /users endpoint with request body', () => {
      const operation = getPathOperation(spec, '/users', 'post');
      expect(operation).toBeDefined();
      expect(operation?.summary).toBe('Create user');
      
      const bodySchema = getRequestBodySchema(operation!);
      expect(bodySchema).toBeDefined();
    });

    it('should generate GET /users/{id} with path parameter', () => {
      const operation = getPathOperation(spec, '/users/{id}', 'get');
      expect(operation).toBeDefined();
      
      const idParam = getParameter(operation!, 'id', 'path');
      expect(idParam).toBeDefined();
      expect(idParam?.required).toBe(true);
      expect((idParam?.schema as any)?.type).toBe('number');
    });
  });

  describe('Tspec Special Types', () => {
    let spec: OpenAPIV3.Document;

    beforeAll(async () => {
      spec = await generateSpec(path.join(SCENARIOS_DIR, 'tspec-types'));
    });

    it('should generate Integer type correctly', () => {
      const eventSchema = getComponentSchema(spec, 'Event') as any;
      expect(eventSchema?.properties?.id?.type).toBe('integer');
    });

    it('should generate DateString with date format', () => {
      const eventSchema = getComponentSchema(spec, 'Event') as any;
      expect(eventSchema?.properties?.date?.type).toBe('string');
      expect(eventSchema?.properties?.date?.format).toBe('date');
    });

    it('should generate DateTimeString with date-time format', () => {
      const eventSchema = getComponentSchema(spec, 'Event') as any;
      expect(eventSchema?.properties?.createdAt?.type).toBe('string');
      expect(eventSchema?.properties?.createdAt?.format).toBe('date-time');
    });

    it('should generate EmailString with email format', () => {
      const eventSchema = getComponentSchema(spec, 'Event') as any;
      expect(eventSchema?.properties?.organizerEmail?.type).toBe('string');
      expect(eventSchema?.properties?.organizerEmail?.format).toBe('email');
    });

    it('should generate UuidString with uuid format', () => {
      const eventSchema = getComponentSchema(spec, 'Event') as any;
      expect(eventSchema?.properties?.uuid?.type).toBe('string');
      expect(eventSchema?.properties?.uuid?.format).toBe('uuid');
    });

    it('should generate UrlString with uri format', () => {
      const eventSchema = getComponentSchema(spec, 'Event') as any;
      expect(eventSchema?.properties?.url?.type).toBe('string');
      expect(eventSchema?.properties?.url?.format).toBe('uri');
    });

    it('should generate NoContent response without content', () => {
      const operation = getPathOperation(spec, '/events/{id}', 'delete');
      expect(operation).toBeDefined();
      
      const response = operation?.responses?.['204'] as OpenAPIV3.ResponseObject;
      expect(response).toBeDefined();
      expect(response?.content).toBeUndefined();
    });
  });

  describe('Enum and Union Types', () => {
    let spec: OpenAPIV3.Document;

    beforeAll(async () => {
      spec = await generateSpec(path.join(SCENARIOS_DIR, 'enum-union'));
    });

    it('should generate string union as enum', () => {
      // Type alias unions are extracted as separate schemas with $ref
      const statusSchema = getComponentSchema(spec, 'Status') as any;
      expect(statusSchema?.enum).toEqual(expect.arrayContaining(['pending', 'active', 'completed', 'cancelled']));
      expect(statusSchema?.enum).toHaveLength(4);
      expect(statusSchema?.type).toBe('string');
      
      // Task schema references Status via $ref
      const taskSchema = getComponentSchema(spec, 'Task') as any;
      expect(taskSchema?.properties?.status?.$ref).toBe('#/components/schemas/Status');
    });

    it('should generate number union as enum', () => {
      // Type alias unions are extracted as separate schemas with $ref
      const prioritySchema = getComponentSchema(spec, 'Priority') as any;
      expect(prioritySchema?.enum).toEqual(expect.arrayContaining([1, 2, 3, 4, 5]));
      expect(prioritySchema?.enum).toHaveLength(5);
      expect(prioritySchema?.type).toBe('number');
      
      // Task schema references Priority via $ref
      const taskSchema = getComponentSchema(spec, 'Task') as any;
      expect(taskSchema?.properties?.priority?.$ref).toBe('#/components/schemas/Priority');
    });

    it('should generate array of union types', () => {
      const taskSchema = getComponentSchema(spec, 'Task') as any;
      expect(taskSchema?.properties?.tags?.type).toBe('array');
      expect(taskSchema?.properties?.tags?.items?.enum).toEqual(expect.arrayContaining(['urgent', 'important', 'low']));
      expect(taskSchema?.properties?.tags?.items?.enum).toHaveLength(3);
    });

    it('should generate query parameters with enum types', () => {
      const operation = getPathOperation(spec, '/tasks', 'get');
      
      const statusParam = getParameter(operation!, 'status', 'query');
      expect((statusParam?.schema as any)?.enum).toEqual(expect.arrayContaining(['pending', 'active', 'completed', 'cancelled']));
      
      const priorityParam = getParameter(operation!, 'priority', 'query');
      expect((priorityParam?.schema as any)?.enum).toEqual(expect.arrayContaining([1, 2, 3, 4, 5]));
    });
  });

  describe('Nested Objects', () => {
    let spec: OpenAPIV3.Document;

    beforeAll(async () => {
      spec = await generateSpec(path.join(SCENARIOS_DIR, 'nested-objects'));
    });

    it('should generate Address schema', () => {
      const addressSchema = getComponentSchema(spec, 'Address');
      expect(addressSchema).toBeDefined();
      expect(addressSchema?.properties).toHaveProperty('street');
      expect(addressSchema?.properties).toHaveProperty('city');
      expect(addressSchema?.properties).toHaveProperty('zipCode');
      expect(addressSchema?.properties).toHaveProperty('country');
    });

    it('should generate Company schema with nested Address reference', () => {
      const companySchema = getComponentSchema(spec, 'Company') as any;
      expect(companySchema).toBeDefined();
      expect(companySchema?.properties?.address?.$ref).toBe('#/components/schemas/Address');
    });

    it('should generate Employee schema with multiple nested references', () => {
      const employeeSchema = getComponentSchema(spec, 'Employee') as any;
      expect(employeeSchema).toBeDefined();
      expect(employeeSchema?.properties?.homeAddress?.$ref).toBe('#/components/schemas/Address');
      expect(employeeSchema?.properties?.workAddress?.$ref).toBe('#/components/schemas/Address');
      expect(employeeSchema?.properties?.company?.$ref).toBe('#/components/schemas/Company');
    });
  });

  describe('Generic Types', () => {
    let spec: OpenAPIV3.Document;

    beforeAll(async () => {
      spec = await generateSpec(path.join(SCENARIOS_DIR, 'generics'));
    });

    it('should generate Product schema', () => {
      const productSchema = getComponentSchema(spec, 'Product');
      expect(productSchema).toBeDefined();
      expect(productSchema?.properties).toHaveProperty('id');
      expect(productSchema?.properties).toHaveProperty('name');
      expect(productSchema?.properties).toHaveProperty('price');
    });

    it('should generate Category schema', () => {
      const categorySchema = getComponentSchema(spec, 'Category');
      expect(categorySchema).toBeDefined();
      expect(categorySchema?.properties).toHaveProperty('id');
      expect(categorySchema?.properties).toHaveProperty('name');
    });

    it('should generate paginated response for products', () => {
      const operation = getPathOperation(spec, '/products', 'get');
      expect(operation).toBeDefined();
      
      const responseSchema = getResponseSchema(operation!);
      expect(responseSchema).toBeDefined();
    });

    it('should generate paginated response for categories', () => {
      const operation = getPathOperation(spec, '/categories', 'get');
      expect(operation).toBeDefined();
      
      const responseSchema = getResponseSchema(operation!);
      expect(responseSchema).toBeDefined();
    });
  });

  describe('Tags and Security', () => {
    let spec: OpenAPIV3.Document;

    beforeAll(async () => {
      spec = await generateSpec(path.join(SCENARIOS_DIR, 'tags-security'));
    });

    it('should apply controller-level tags to all endpoints', () => {
      // basePath adds trailing slash, so path is /articles/
      const getOperation = getPathOperation(spec, '/articles/', 'get');
      expect(getOperation?.tags).toContain('Article');
      
      const postOperation = getPathOperation(spec, '/articles/', 'post');
      expect(postOperation?.tags).toContain('Article');
    });

    it('should merge endpoint-level tags with controller-level tags', () => {
      const putOperation = getPathOperation(spec, '/articles/{id}', 'put');
      expect(putOperation?.tags).toContain('Article');
      expect(putOperation?.tags).toContain('Admin');
      
      const deleteOperation = getPathOperation(spec, '/articles/{id}', 'delete');
      expect(deleteOperation?.tags).toContain('Article');
      expect(deleteOperation?.tags).toContain('Admin');
    });

    it('should apply security to endpoints with controller-level security', () => {
      const postOperation = getPathOperation(spec, '/articles/', 'post');
      expect(postOperation?.security).toBeDefined();
      expect(postOperation?.security).toEqual([{ bearerAuth: [] }]);
    });

    it('should not apply security to endpoints with empty security override', () => {
      const getOperation = getPathOperation(spec, '/articles/', 'get');
      // Empty string security override results in empty string (not undefined)
      // This is the current Tspec behavior
      expect(getOperation?.security).toBeFalsy();
    });

    it('should use basePath for URL generation', () => {
      // basePath '/articles' + path '/' = '/articles/'
      expect(spec.paths).toHaveProperty('/articles/');
      expect(spec.paths).toHaveProperty('/articles/{id}');
    });
  });

  describe('Query Parameters', () => {
    let spec: OpenAPIV3.Document;

    beforeAll(async () => {
      spec = await generateSpec(path.join(SCENARIOS_DIR, 'query-params'));
    });

    it('should generate required query parameter', () => {
      const operation = getPathOperation(spec, '/search', 'get');
      const qParam = getParameter(operation!, 'q', 'query');
      
      expect(qParam).toBeDefined();
      expect(qParam?.required).toBe(true);
      expect((qParam?.schema as any)?.type).toBe('string');
    });

    it('should generate optional query parameters', () => {
      const operation = getPathOperation(spec, '/search', 'get');
      
      const pageParam = getParameter(operation!, 'page', 'query');
      expect(pageParam?.required).toBe(false);
      
      const limitParam = getParameter(operation!, 'limit', 'query');
      expect(limitParam?.required).toBe(false);
    });

    it('should generate enum query parameters', () => {
      const operation = getPathOperation(spec, '/search', 'get');
      
      const sortByParam = getParameter(operation!, 'sortBy', 'query');
      expect((sortByParam?.schema as any)?.enum).toEqual(expect.arrayContaining(['title', 'score', 'date']));
      expect((sortByParam?.schema as any)?.enum).toHaveLength(3);
      
      const orderParam = getParameter(operation!, 'order', 'query');
      expect((orderParam?.schema as any)?.enum).toEqual(expect.arrayContaining(['asc', 'desc']));
      expect((orderParam?.schema as any)?.enum).toHaveLength(2);
    });

    it('should generate array query parameter', () => {
      const operation = getPathOperation(spec, '/search', 'get');
      const tagsParam = getParameter(operation!, 'tags', 'query');
      
      expect((tagsParam?.schema as any)?.type).toBe('array');
      expect((tagsParam?.schema as any)?.items?.type).toBe('string');
    });

    it('should generate boolean query parameter', () => {
      const operation = getPathOperation(spec, '/search', 'get');
      const includeArchivedParam = getParameter(operation!, 'includeArchived', 'query');
      
      expect((includeArchivedParam?.schema as any)?.type).toBe('boolean');
    });
  });

  describe('JSDoc Annotations', () => {
    let spec: OpenAPIV3.Document;

    beforeAll(async () => {
      spec = await generateSpec(path.join(SCENARIOS_DIR, 'jsdoc-annotations'));
    });

    it('should apply minimum/maximum constraints', () => {
      const profileSchema = getComponentSchema(spec, 'UserProfile') as any;
      
      expect(profileSchema?.properties?.id?.minimum).toBe(1);
      expect(profileSchema?.properties?.age?.minimum).toBe(0);
      expect(profileSchema?.properties?.age?.maximum).toBe(150);
    });

    it('should apply string length constraints', () => {
      const profileSchema = getComponentSchema(spec, 'UserProfile') as any;
      
      expect(profileSchema?.properties?.username?.minLength).toBe(3);
      expect(profileSchema?.properties?.username?.maxLength).toBe(20);
    });

    it('should apply pattern constraint', () => {
      const profileSchema = getComponentSchema(spec, 'UserProfile') as any;
      
      expect(profileSchema?.properties?.username?.pattern).toBe('^[a-zA-Z0-9_]+$');
    });

    it('should apply format constraints', () => {
      const profileSchema = getComponentSchema(spec, 'UserProfile') as any;
      
      expect(profileSchema?.properties?.email?.format).toBe('email');
      expect(profileSchema?.properties?.website?.format).toBe('uri');
    });

    it('should apply deprecated flag', () => {
      const profileSchema = getComponentSchema(spec, 'UserProfile') as any;
      
      expect(profileSchema?.properties?.name?.deprecated).toBe(true);
    });
  });

  describe('Multiple Response Codes', () => {
    let spec: OpenAPIV3.Document;

    beforeAll(async () => {
      spec = await generateSpec(path.join(SCENARIOS_DIR, 'multiple-responses'));
    });

    it('should generate multiple response codes for GET', () => {
      const operation = getPathOperation(spec, '/items/{id}', 'get');
      
      expect(operation?.responses).toHaveProperty('200');
      expect(operation?.responses).toHaveProperty('404');
      expect(operation?.responses).toHaveProperty('500');
    });

    it('should generate multiple response codes for DELETE', () => {
      const operation = getPathOperation(spec, '/items/{id}', 'delete');
      
      expect(operation?.responses).toHaveProperty('204');
      expect(operation?.responses).toHaveProperty('403');
      expect(operation?.responses).toHaveProperty('404');
    });

    it('should reference correct schemas for different response codes', () => {
      const operation = getPathOperation(spec, '/items/{id}', 'get');
      
      const successResponse = operation?.responses?.['200'] as OpenAPIV3.ResponseObject;
      const successSchema = successResponse?.content?.['application/json']?.schema as OpenAPIV3.ReferenceObject;
      expect(successSchema?.$ref).toBe('#/components/schemas/Item');
      
      const errorResponse = operation?.responses?.['404'] as OpenAPIV3.ResponseObject;
      const errorSchema = errorResponse?.content?.['application/json']?.schema as OpenAPIV3.ReferenceObject;
      expect(errorSchema?.$ref).toBe('#/components/schemas/ErrorResponse');
    });

    it('should generate ErrorResponse schema', () => {
      const errorSchema = getComponentSchema(spec, 'ErrorResponse');
      expect(errorSchema).toBeDefined();
      expect(errorSchema?.properties).toHaveProperty('code');
      expect(errorSchema?.properties).toHaveProperty('message');
      expect(errorSchema?.properties).toHaveProperty('details');
    });
  });

  describe('Union Type Body', () => {
    let spec: OpenAPIV3.Document;

    beforeAll(async () => {
      spec = await generateSpec(path.join(SCENARIOS_DIR, 'union-body'));
    });

    it('should generate requestBody with $ref to union type schema', () => {
      const operation = getPathOperation(spec, '/books', 'post');
      expect(operation).toBeDefined();
      
      const bodySchema = getRequestBodySchema(operation!) as any;
      expect(bodySchema).toBeDefined();
      expect(bodySchema?.$ref).toBe('#/components/schemas/BookRequest');
    });

    it('should generate BookRequest schema with anyOf containing both union variants', () => {
      const bookRequestSchema = getComponentSchema(spec, 'BookRequest') as any;
      expect(bookRequestSchema).toBeDefined();
      expect(bookRequestSchema?.anyOf).toBeDefined();
      expect(bookRequestSchema?.anyOf).toHaveLength(2);
      
      const poemVariant = bookRequestSchema?.anyOf?.find((v: any) => 
        v.properties?.type?.enum?.[0] === 'poem'
      );
      expect(poemVariant).toBeDefined();
      expect(poemVariant?.properties?.verses?.type).toBe('number');
      
      const novelVariant = bookRequestSchema?.anyOf?.find((v: any) => 
        v.properties?.type?.enum?.[0] === 'novel'
      );
      expect(novelVariant).toBeDefined();
      expect(novelVariant?.properties?.chapters?.type).toBe('number');
    });
  });
});

describe('Scenario Snapshot Tests', () => {
  it.each([
    'basic-types',
    'tspec-types',
    'enum-union',
    'nested-objects',
    'generics',
    'tags-security',
    'query-params',
    'jsdoc-annotations',
    'multiple-responses',
    'union-body',
  ])('scenario "%s" should match expected output structure', async (scenarioName: string) => {
    const scenarioDir = path.join(SCENARIOS_DIR, scenarioName);
    const spec = await generateSpec(scenarioDir);
    const expected = await loadExpected(scenarioDir);

    // Check paths exist
    for (const pathKey of Object.keys(expected.paths || {})) {
      expect(spec.paths).toHaveProperty(pathKey);
    }

    // Check schemas exist
    for (const schemaKey of Object.keys(expected.components?.schemas || {})) {
      expect(spec.components?.schemas).toHaveProperty(schemaKey);
    }
  });
});
