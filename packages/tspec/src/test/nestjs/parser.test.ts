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
        controllerGlobs: [path.join(fixturesPath, 'books.controller.ts')],
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

    it('should parse file upload decorators', () => {
      const result = parseNestControllers({
        tsconfigPath: path.join(fixturesPath, 'tsconfig.json'),
        controllerGlobs: [path.join(fixturesPath, 'files.controller.ts')],
      });

      expect(result.controllers).toHaveLength(1);
      
      const controller = result.controllers[0];
      expect(controller.name).toBe('FilesController');
      expect(controller.path).toBe('files');
      expect(controller.methods).toHaveLength(5);

      // Single file upload
      const uploadFile = controller.methods.find((m) => m.name === 'uploadFile');
      expect(uploadFile).toBeDefined();
      expect(uploadFile?.httpMethod).toBe('post');
      expect(uploadFile?.parameters).toHaveLength(1);
      expect(uploadFile?.parameters[0].category).toBe('file');
      expect(uploadFile?.parameters[0].fieldName).toBe('file');

      // Multiple files upload
      const uploadFiles = controller.methods.find((m) => m.name === 'uploadFiles');
      expect(uploadFiles).toBeDefined();
      expect(uploadFiles?.httpMethod).toBe('post');
      expect(uploadFiles?.parameters).toHaveLength(1);
      expect(uploadFiles?.parameters[0].category).toBe('files');
      expect(uploadFiles?.parameters[0].fieldName).toBe('files');

      // File upload with metadata
      const uploadWithMetadata = controller.methods.find((m) => m.name === 'uploadWithMetadata');
      expect(uploadWithMetadata).toBeDefined();
      expect(uploadWithMetadata?.parameters).toHaveLength(2);
      const fileParam = uploadWithMetadata?.parameters.find((p) => p.category === 'file');
      const bodyParam = uploadWithMetadata?.parameters.find((p) => p.category === 'body');
      expect(fileParam).toBeDefined();
      expect(fileParam?.fieldName).toBe('document');
      expect(bodyParam).toBeDefined();
    });
  });

  describe('generateOpenApiFromNest', () => {
    it('should generate valid OpenAPI spec', async () => {
      const result = parseNestControllers({
        tsconfigPath: path.join(fixturesPath, 'tsconfig.json'),
        controllerGlobs: [path.join(fixturesPath, 'books.controller.ts')],
      });

      const openapi = await generateOpenApiFromNest(result, {
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

    it('should generate multipart/form-data for file uploads', async () => {
      const result = parseNestControllers({
        tsconfigPath: path.join(fixturesPath, 'tsconfig.json'),
        controllerGlobs: [path.join(fixturesPath, 'files.controller.ts')],
      });

      const openapi = await generateOpenApiFromNest(result, {
        title: 'Files API',
        version: '1.0.0',
      });

      // Single file upload
      const uploadPath = openapi.paths['/files/upload'];
      expect(uploadPath?.post).toBeDefined();
      const uploadOp = uploadPath?.post as any;
      expect(uploadOp.requestBody).toBeDefined();
      expect(uploadOp.requestBody.content['multipart/form-data']).toBeDefined();
      const uploadSchema = uploadOp.requestBody.content['multipart/form-data'].schema;
      expect(uploadSchema.type).toBe('object');
      expect(uploadSchema.properties.file).toEqual({ type: 'string', format: 'binary' });

      // Multiple files upload
      const uploadMultiplePath = openapi.paths['/files/upload-multiple'];
      expect(uploadMultiplePath?.post).toBeDefined();
      const uploadMultipleOp = uploadMultiplePath?.post as any;
      expect(uploadMultipleOp.requestBody.content['multipart/form-data']).toBeDefined();
      const uploadMultipleSchema = uploadMultipleOp.requestBody.content['multipart/form-data'].schema;
      expect(uploadMultipleSchema.properties.files).toEqual({
        type: 'array',
        items: { type: 'string', format: 'binary' },
      });

      // File upload with metadata
      const uploadWithMetadataPath = openapi.paths['/files/upload-with-metadata'];
      expect(uploadWithMetadataPath?.post).toBeDefined();
      const uploadWithMetadataOp = uploadWithMetadataPath?.post as any;
      const metadataSchema = uploadWithMetadataOp.requestBody.content['multipart/form-data'].schema;
      expect(metadataSchema.properties.document).toEqual({ type: 'string', format: 'binary' });
    });

    it('should include DTO fields in multipart/form-data schema (Issue #87)', async () => {
      const result = parseNestControllers({
        tsconfigPath: path.join(fixturesPath, 'tsconfig.json'),
        controllerGlobs: [path.join(fixturesPath, 'files.controller.ts')],
      });

      const openapi = await generateOpenApiFromNest(result, {
        title: 'Files API',
        version: '1.0.0',
      });

      // File upload with DTO fields
      const fromImagePath = openapi.paths['/files/from-image'];
      expect(fromImagePath?.post).toBeDefined();
      const fromImageOp = fromImagePath?.post as any;
      expect(fromImageOp.requestBody.content['multipart/form-data']).toBeDefined();
      const fromImageSchema = fromImageOp.requestBody.content['multipart/form-data'].schema;
      
      // Should have file field
      expect(fromImageSchema.properties.file).toEqual({ type: 'string', format: 'binary' });
      
      // Should also have DTO fields (intakeAt, memo)
      expect(fromImageSchema.properties.intakeAt).toBeDefined();
      expect(fromImageSchema.properties.memo).toBeDefined();
    });

    it('should generate 200 response when only error responses are defined via @ApiResponse (Issue #87)', async () => {
      const result = parseNestControllers({
        tsconfigPath: path.join(fixturesPath, 'tsconfig.json'),
        controllerGlobs: [path.join(fixturesPath, 'files.controller.ts')],
      });

      const openapi = await generateOpenApiFromNest(result, {
        title: 'Files API',
        version: '1.0.0',
      });

      // Endpoint with only error ApiResponse decorators
      const withErrorPath = openapi.paths['/files/with-error-response'];
      expect(withErrorPath?.post).toBeDefined();
      const withErrorOp = withErrorPath?.post as any;
      
      // Should have error responses from @ApiResponse
      expect(withErrorOp.responses['409']).toBeDefined();
      expect(withErrorOp.responses['409'].description).toBe('Conflict error');
      expect(withErrorOp.responses['400']).toBeDefined();
      expect(withErrorOp.responses['400'].description).toBe('Bad request');
      
      // Should also have auto-generated 200 response from return type
      expect(withErrorOp.responses['200']).toBeDefined();
      expect(withErrorOp.responses['200'].description).toBe('Successful response');
      expect(withErrorOp.responses['200'].content['application/json']).toBeDefined();
    });
  });
});
