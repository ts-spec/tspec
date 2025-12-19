import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { generateTspec } from '../generator';
import type { Tspec } from '../types/tspec';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FIXTURES_DIR = path.join(__dirname, 'nestjs/fixtures');
const SCENARIOS_DIR = path.join(__dirname, 'scenarios');
const OUTPUT_DIR = path.join(__dirname, 'output');

describe('CLI and Generate Function', () => {
  beforeAll(async () => {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
  });

  afterAll(async () => {
    await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
  });

  describe('generateTspec', () => {
    it('should generate OpenAPI spec with default options', async () => {
      const spec = await generateTspec({
        specPathGlobs: [path.join(SCENARIOS_DIR, 'basic-types/spec.ts')],
        tsconfigPath: path.join(__dirname, '../../tsconfig.json'),
        ignoreErrors: true,
        silent: true,
      });

      expect(spec).toBeDefined();
      expect(spec.openapi).toBe('3.0.3');
      expect(spec.info).toBeDefined();
      expect(spec.paths).toBeDefined();
    });

    it('should use custom openapi options', async () => {
      const spec = await generateTspec({
        specPathGlobs: [path.join(SCENARIOS_DIR, 'basic-types/spec.ts')],
        tsconfigPath: path.join(__dirname, '../../tsconfig.json'),
        ignoreErrors: true,
        silent: true,
        openapi: {
          title: 'Custom API Title',
          version: '2.0.0',
          description: 'Custom description',
        },
      });

      expect(spec.info.title).toBe('Custom API Title');
      expect(spec.info.version).toBe('2.0.0');
      expect(spec.info.description).toBe('Custom description');
    });

    it('should include securityDefinitions in components', async () => {
      const spec = await generateTspec({
        specPathGlobs: [path.join(SCENARIOS_DIR, 'basic-types/spec.ts')],
        tsconfigPath: path.join(__dirname, '../../tsconfig.json'),
        ignoreErrors: true,
        silent: true,
        openapi: {
          title: 'API with Security',
          version: '1.0.0',
          securityDefinitions: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
      });

      expect(spec.components?.securitySchemes).toBeDefined();
      expect(spec.components?.securitySchemes?.bearerAuth).toEqual({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      });
    });

    it('should include servers in spec', async () => {
      const spec = await generateTspec({
        specPathGlobs: [path.join(SCENARIOS_DIR, 'basic-types/spec.ts')],
        tsconfigPath: path.join(__dirname, '../../tsconfig.json'),
        ignoreErrors: true,
        silent: true,
        openapi: {
          title: 'API with Servers',
          version: '1.0.0',
          servers: [
            { url: 'https://api.example.com', description: 'Production' },
            { url: 'https://staging.example.com', description: 'Staging' },
          ],
        },
      });

      expect(spec.servers).toBeDefined();
      expect(spec.servers).toHaveLength(2);
      expect(spec.servers?.[0].url).toBe('https://api.example.com');
      expect(spec.servers?.[1].url).toBe('https://staging.example.com');
    });

    it('should write output file when outputPath is provided', async () => {
      const outputPath = path.join(OUTPUT_DIR, 'test-output.json');

      const spec = await generateTspec({
        specPathGlobs: [path.join(SCENARIOS_DIR, 'basic-types/spec.ts')],
        tsconfigPath: path.join(__dirname, '../../tsconfig.json'),
        ignoreErrors: true,
        silent: true,
        outputPath,
      });

      const fileExists = await fs.access(outputPath).then(() => true).catch(() => false);
      expect(fileExists).toBe(true);

      const fileContent = await fs.readFile(outputPath, 'utf-8');
      const parsedContent = JSON.parse(fileContent);
      expect(parsedContent.openapi).toBe('3.0.3');
    });
  });

  describe('generateTspec with nestjs mode', () => {
    it('should generate OpenAPI spec from NestJS controllers', async () => {
      const spec = await generateTspec({
        tsconfigPath: path.join(FIXTURES_DIR, 'tsconfig.json'),
        specPathGlobs: [path.join(FIXTURES_DIR, 'books.controller.ts')],
        nestjs: true,
        silent: true,
      });

      expect(spec).toBeDefined();
      expect(spec.openapi).toBe('3.0.3');
      expect(spec.paths['/books']).toBeDefined();
      expect(spec.paths['/books']?.get).toBeDefined();
      expect(spec.paths['/books']?.post).toBeDefined();
    });

    it('should use custom openapi options for NestJS', async () => {
      const spec = await generateTspec({
        tsconfigPath: path.join(FIXTURES_DIR, 'tsconfig.json'),
        specPathGlobs: [path.join(FIXTURES_DIR, 'books.controller.ts')],
        nestjs: true,
        silent: true,
        openapi: {
          title: 'NestJS Books API',
          version: '3.0.0',
          description: 'Books API generated from NestJS',
        },
      });

      expect(spec.info.title).toBe('NestJS Books API');
      expect(spec.info.version).toBe('3.0.0');
      expect(spec.info.description).toBe('Books API generated from NestJS');
    });

    it('should include securityDefinitions for NestJS', async () => {
      const spec = await generateTspec({
        tsconfigPath: path.join(FIXTURES_DIR, 'tsconfig.json'),
        specPathGlobs: [path.join(FIXTURES_DIR, 'books.controller.ts')],
        nestjs: true,
        silent: true,
        openapi: {
          title: 'Secure API',
          version: '1.0.0',
          securityDefinitions: {
            apiKey: {
              type: 'apiKey',
              in: 'header',
              name: 'X-API-Key',
            },
          },
        },
      });

      expect(spec.components?.securitySchemes).toBeDefined();
      expect(spec.components?.securitySchemes?.apiKey).toEqual({
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key',
      });
    });

    it('should include servers for NestJS', async () => {
      const spec = await generateTspec({
        tsconfigPath: path.join(FIXTURES_DIR, 'tsconfig.json'),
        specPathGlobs: [path.join(FIXTURES_DIR, 'books.controller.ts')],
        nestjs: true,
        silent: true,
        openapi: {
          title: 'API',
          version: '1.0.0',
          servers: [
            { url: 'https://api.books.com', description: 'Production' },
          ],
        },
      });

      expect(spec.servers).toBeDefined();
      expect(spec.servers).toHaveLength(1);
      expect(spec.servers?.[0].url).toBe('https://api.books.com');
    });

    it('should parse multiple controllers', async () => {
      const spec = await generateTspec({
        tsconfigPath: path.join(FIXTURES_DIR, 'tsconfig.json'),
        specPathGlobs: [
          path.join(FIXTURES_DIR, 'books.controller.ts'),
          path.join(FIXTURES_DIR, 'users.controller.ts'),
        ],
        nestjs: true,
        silent: true,
      });

      expect(spec.paths['/books']).toBeDefined();
      expect(spec.paths['/users']).toBeDefined();
    });

    it('should handle file upload controllers', async () => {
      const spec = await generateTspec({
        tsconfigPath: path.join(FIXTURES_DIR, 'tsconfig.json'),
        specPathGlobs: [path.join(FIXTURES_DIR, 'files.controller.ts')],
        nestjs: true,
        silent: true,
      });

      expect(spec.paths['/files/upload']).toBeDefined();
      const uploadOp = spec.paths['/files/upload']?.post as any;
      expect(uploadOp?.requestBody?.content?.['multipart/form-data']).toBeDefined();
    });

    it('should parse @ApiResponse decorators', async () => {
      const spec = await generateTspec({
        tsconfigPath: path.join(FIXTURES_DIR, 'tsconfig.json'),
        specPathGlobs: [path.join(FIXTURES_DIR, 'books.controller.ts')],
        nestjs: true,
        silent: true,
      });

      // findOne method has @ApiResponse decorators
      const findOneOp = spec.paths['/books/{id}']?.get as any;
      expect(findOneOp).toBeDefined();
      expect(findOneOp.responses['200']).toBeDefined();
      expect(findOneOp.responses['200'].description).toBe('Book found');
      expect(findOneOp.responses['404']).toBeDefined();
      expect(findOneOp.responses['404'].description).toBe('Book not found');
    });
  });

  describe('Tspec.GenerateParams type compatibility', () => {
    it('should accept all GenerateParams fields', async () => {
      const params: Tspec.GenerateParams = {
        specPathGlobs: ['src/**/*.ts'],
        tsconfigPath: './tsconfig.json',
        configPath: './tspec.config.json',
        outputPath: './openapi.json',
        specVersion: 3,
        openapi: {
          title: 'Test API',
          version: '1.0.0',
          description: 'Test description',
          securityDefinitions: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
            },
          },
          servers: [{ url: 'https://api.test.com' }],
        },
        debug: false,
        ignoreErrors: true,
        nestjs: false,
      };

      expect(params.specPathGlobs).toEqual(['src/**/*.ts']);
      expect(params.nestjs).toBe(false);
      expect(params.openapi?.securityDefinitions).toBeDefined();
      expect(params.openapi?.servers).toBeDefined();
    });

    it('should accept nestjs mode in GenerateParams', () => {
      const params: Tspec.GenerateParams = {
        specPathGlobs: ['src/**/*.controller.ts'],
        tsconfigPath: './tsconfig.json',
        nestjs: true,
        openapi: {
          title: 'NestJS API',
          version: '1.0.0',
        },
      };

      expect(params.nestjs).toBe(true);
      expect(params.specPathGlobs).toEqual(['src/**/*.controller.ts']);
    });
  });

  describe('InitTspecServerOptions type compatibility', () => {
    it('should extend GenerateParams with server options', () => {
      const options: Tspec.InitTspecServerOptions = {
        specPathGlobs: ['src/**/*.ts'],
        tsconfigPath: './tsconfig.json',
        openapi: {
          title: 'Server API',
          version: '1.0.0',
        },
        port: 8080,
        proxyHost: 'https://api.example.com',
        nestjs: false,
      };

      expect(options.port).toBe(8080);
      expect(options.proxyHost).toBe('https://api.example.com');
      expect(options.nestjs).toBe(false);
    });
  });
});
