import { describe, it, expect } from 'vitest';
import path from 'path';
import { parseNestControllers } from '../../nestjs/parser';
import { generateOpenApiFromNest } from '../../nestjs/openapiGenerator';

describe('NestJS Parser', () => {
  const fixturesPath = path.join(__dirname, 'fixtures');

  describe('parseNestControllers', () => {
    it('should parse controller with basic CRUD operations', () => {
      const result = parseNestControllers({
        tsconfigPath: path.join(fixturesPath, 'tsconfig.json'),
        controllerGlobs: [path.join(fixturesPath, '*.controller.ts')],
      });

      expect(result.controllers).toHaveLength(1);
      
      const controller = result.controllers[0];
      expect(controller.name).toBe('BooksController');
      expect(controller.path).toBe('books');
      expect(controller.methods).toHaveLength(5);

      const findAll = controller.methods.find((m) => m.name === 'findAll');
      expect(findAll).toBeDefined();
      expect(findAll?.httpMethod).toBe('get');
      expect(findAll?.path).toBe('');

      const findOne = controller.methods.find((m) => m.name === 'findOne');
      expect(findOne).toBeDefined();
      expect(findOne?.httpMethod).toBe('get');
      expect(findOne?.path).toBe(':id');
      expect(findOne?.parameters).toHaveLength(1);
      expect(findOne?.parameters[0].category).toBe('param');

      const create = controller.methods.find((m) => m.name === 'create');
      expect(create).toBeDefined();
      expect(create?.httpMethod).toBe('post');
      expect(create?.parameters).toHaveLength(1);
      expect(create?.parameters[0].category).toBe('body');
    });
  });

  describe('generateOpenApiFromNest', () => {
    it('should generate valid OpenAPI spec', () => {
      const result = parseNestControllers({
        tsconfigPath: path.join(fixturesPath, 'tsconfig.json'),
        controllerGlobs: [path.join(fixturesPath, '*.controller.ts')],
      });

      const openapi = generateOpenApiFromNest(result, {
        title: 'Books API',
        version: '1.0.0',
      });

      expect(openapi.openapi).toBe('3.0.3');
      expect(openapi.info.title).toBe('Books API');
      expect(openapi.paths['/books']).toBeDefined();
      expect(openapi.paths['/books']?.get).toBeDefined();
      expect(openapi.paths['/books']?.post).toBeDefined();
      expect(openapi.paths['/books/{id}']).toBeDefined();
      expect(openapi.paths['/books/{id}']?.get).toBeDefined();
      expect(openapi.paths['/books/{id}']?.put).toBeDefined();
      expect(openapi.paths['/books/{id}']?.delete).toBeDefined();
    });
  });
});
