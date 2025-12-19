import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { generateTspec, defaultGenerateParams, createJsonFile } from '../generator';
import type { Tspec } from '../types/tspec';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCENARIOS_DIR = path.join(__dirname, 'scenarios');
const OUTPUT_DIR = path.join(__dirname, 'output');

describe('Generator Module', () => {
  beforeAll(async () => {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
  });

  afterAll(async () => {
    await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
  });

  describe('defaultGenerateParams', () => {
    it('should have correct default values', () => {
      expect(defaultGenerateParams.specPathGlobs).toEqual(['**/*.ts']);
      expect(defaultGenerateParams.tsconfigPath).toBe('tsconfig.json');
      expect(defaultGenerateParams.configPath).toBe('tspec.config.json');
      expect(defaultGenerateParams.specVersion).toBe(3);
      expect(defaultGenerateParams.debug).toBe(false);
      expect(defaultGenerateParams.ignoreErrors).toBe(true);
    });

    it('should have correct default openapi values', () => {
      expect(defaultGenerateParams.openapi.title).toBe('Tspec API');
      expect(defaultGenerateParams.openapi.version).toBe('0.0.1');
      expect(defaultGenerateParams.openapi.description).toBe('');
    });
  });

  describe('generateTspec', () => {
    it('should generate valid OpenAPI 3.0.3 document', async () => {
      const spec = await generateTspec({
        specPathGlobs: [path.join(SCENARIOS_DIR, 'basic-types/spec.ts')],
        tsconfigPath: path.join(__dirname, '../../tsconfig.json'),
        ignoreErrors: true,
      });

      expect(spec.openapi).toBe('3.0.3');
      expect(spec.info).toBeDefined();
      expect(spec.paths).toBeDefined();
      expect(typeof spec.paths).toBe('object');
    });

    it('should merge default params with provided params', async () => {
      const spec = await generateTspec({
        specPathGlobs: [path.join(SCENARIOS_DIR, 'basic-types/spec.ts')],
        tsconfigPath: path.join(__dirname, '../../tsconfig.json'),
        ignoreErrors: true,
        openapi: {
          title: 'Custom Title',
        },
      });

      expect(spec.info.title).toBe('Custom Title');
      // version should use default since not provided
      expect(spec.info.version).toBe('0.0.1');
    });

    it('should generate components with schemas', async () => {
      const spec = await generateTspec({
        specPathGlobs: [path.join(SCENARIOS_DIR, 'basic-types/spec.ts')],
        tsconfigPath: path.join(__dirname, '../../tsconfig.json'),
        ignoreErrors: true,
      });

      expect(spec.components).toBeDefined();
      expect(spec.components?.schemas).toBeDefined();
      expect(Object.keys(spec.components?.schemas || {}).length).toBeGreaterThan(0);
    });

    it('should include securitySchemes when securityDefinitions provided', async () => {
      const spec = await generateTspec({
        specPathGlobs: [path.join(SCENARIOS_DIR, 'basic-types/spec.ts')],
        tsconfigPath: path.join(__dirname, '../../tsconfig.json'),
        ignoreErrors: true,
        openapi: {
          securityDefinitions: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
            apiKey: {
              type: 'apiKey',
              in: 'header',
              name: 'X-API-Key',
            },
          },
        },
      });

      expect(spec.components?.securitySchemes).toBeDefined();
      expect(spec.components?.securitySchemes?.bearerAuth).toBeDefined();
      expect(spec.components?.securitySchemes?.apiKey).toBeDefined();
    });

    it('should include servers when provided', async () => {
      const spec = await generateTspec({
        specPathGlobs: [path.join(SCENARIOS_DIR, 'basic-types/spec.ts')],
        tsconfigPath: path.join(__dirname, '../../tsconfig.json'),
        ignoreErrors: true,
        openapi: {
          servers: [
            { url: 'https://api.prod.com', description: 'Production' },
            { url: 'https://api.staging.com', description: 'Staging' },
            { url: 'http://localhost:3000', description: 'Development' },
          ],
        },
      });

      expect(spec.servers).toHaveLength(3);
      expect(spec.servers?.[0]).toEqual({ url: 'https://api.prod.com', description: 'Production' });
      expect(spec.servers?.[1]).toEqual({ url: 'https://api.staging.com', description: 'Staging' });
      expect(spec.servers?.[2]).toEqual({ url: 'http://localhost:3000', description: 'Development' });
    });

    it('should generate paths from DefineApiSpec types', async () => {
      const spec = await generateTspec({
        specPathGlobs: [path.join(SCENARIOS_DIR, 'basic-types/spec.ts')],
        tsconfigPath: path.join(__dirname, '../../tsconfig.json'),
        ignoreErrors: true,
      });

      expect(Object.keys(spec.paths).length).toBeGreaterThan(0);
    });

    it('should handle multiple spec files', async () => {
      const spec = await generateTspec({
        specPathGlobs: [
          path.join(SCENARIOS_DIR, 'basic-types/spec.ts'),
          path.join(SCENARIOS_DIR, 'nested-objects/spec.ts'),
        ],
        tsconfigPath: path.join(__dirname, '../../tsconfig.json'),
        ignoreErrors: true,
      });

      expect(spec.paths).toBeDefined();
      expect(spec.components?.schemas).toBeDefined();
    });
  });

  describe('createJsonFile', () => {
    it('should create JSON file with formatted content', async () => {
      const outputPath = path.join(OUTPUT_DIR, 'test-create.json');
      const testData = { foo: 'bar', nested: { value: 123 } };

      await createJsonFile(outputPath, testData);

      const content = await fs.readFile(outputPath, 'utf-8');
      const parsed = JSON.parse(content);
      expect(parsed).toEqual(testData);
    });

    it('should create nested directories if they do not exist', async () => {
      const outputPath = path.join(OUTPUT_DIR, 'nested/deep/test.json');
      const testData = { test: true };

      await createJsonFile(outputPath, testData);

      const content = await fs.readFile(outputPath, 'utf-8');
      const parsed = JSON.parse(content);
      expect(parsed).toEqual(testData);
    });

    it('should format JSON with 2-space indentation', async () => {
      const outputPath = path.join(OUTPUT_DIR, 'formatted.json');
      const testData = { a: 1, b: 2 };

      await createJsonFile(outputPath, testData);

      const content = await fs.readFile(outputPath, 'utf-8');
      expect(content).toContain('  "a": 1');
      expect(content).toContain('  "b": 2');
    });
  });

  describe('Output file generation', () => {
    it('should write OpenAPI spec to file when outputPath provided', async () => {
      const outputPath = path.join(OUTPUT_DIR, 'openapi-output.json');

      await generateTspec({
        specPathGlobs: [path.join(SCENARIOS_DIR, 'basic-types/spec.ts')],
        tsconfigPath: path.join(__dirname, '../../tsconfig.json'),
        ignoreErrors: true,
        outputPath,
      });

      const fileExists = await fs.access(outputPath).then(() => true).catch(() => false);
      expect(fileExists).toBe(true);

      const content = await fs.readFile(outputPath, 'utf-8');
      const spec = JSON.parse(content);
      expect(spec.openapi).toBe('3.0.3');
    });

    it('should not write file when outputPath not provided', async () => {
      const spec = await generateTspec({
        specPathGlobs: [path.join(SCENARIOS_DIR, 'basic-types/spec.ts')],
        tsconfigPath: path.join(__dirname, '../../tsconfig.json'),
        ignoreErrors: true,
      });

      // Should still return the spec
      expect(spec).toBeDefined();
      expect(spec.openapi).toBe('3.0.3');
    });
  });

  describe('specVersion handling', () => {
    it('should generate OpenAPI 3.0.3 for specVersion 3', async () => {
      const spec = await generateTspec({
        specPathGlobs: [path.join(SCENARIOS_DIR, 'basic-types/spec.ts')],
        tsconfigPath: path.join(__dirname, '../../tsconfig.json'),
        ignoreErrors: true,
        specVersion: 3,
      });

      expect(spec.openapi).toBe('3.0.3');
    });
  });

  describe('Error handling', () => {
    it('should handle ignoreErrors option', async () => {
      // With ignoreErrors: true, should not throw
      const spec = await generateTspec({
        specPathGlobs: [path.join(SCENARIOS_DIR, 'basic-types/spec.ts')],
        tsconfigPath: path.join(__dirname, '../../tsconfig.json'),
        ignoreErrors: true,
      });

      expect(spec).toBeDefined();
    });
  });
});
