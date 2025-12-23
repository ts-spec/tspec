import { describe, it, expect } from 'vitest';
import path from 'path';
import { parseNestControllers } from '../../nestjs/parser';
import { generateOpenApiFromNest } from '../../nestjs/openapiGenerator';

describe('NestJS Schema Generation', () => {
  const fixturesPath = path.join(__dirname, 'fixtures');

  const getOpenApiSpec = () => {
    const result = parseNestControllers({
      tsconfigPath: path.join(fixturesPath, 'tsconfig.json'),
      controllerGlobs: [path.join(fixturesPath, 'users.controller.ts')],
    });

    return generateOpenApiFromNest(result, {
      title: 'Users API',
      version: '1.0.0',
    });
  };

  describe('JSDoc parsing', () => {
    it('should parse @example tag', () => {
      const openapi = getOpenApiSpec();
      const userDto = openapi.components?.schemas?.UserDto as any;

      expect(userDto).toBeDefined();
      expect(userDto.properties.id.example).toBe(1);
      expect(userDto.properties.email.example).toBe('user@example.com');
      expect(userDto.properties.name.example).toBe('홍길동');
    });

    it('should parse @minimum and @maximum tags', () => {
      const openapi = getOpenApiSpec();
      const userDto = openapi.components?.schemas?.UserDto as any;

      expect(userDto.properties.age.minimum).toBe(0);
      expect(userDto.properties.age.maximum).toBe(150);
    });

    it('should parse @minLength and @maxLength tags', () => {
      const openapi = getOpenApiSpec();
      const createUserDto = openapi.components?.schemas?.CreateUserDto as any;

      expect(createUserDto.properties.name.minLength).toBe(2);
      expect(createUserDto.properties.name.maxLength).toBe(50);
      expect(createUserDto.properties.password.minLength).toBe(8);
    });

    it('should parse @pattern tag', () => {
      const openapi = getOpenApiSpec();
      const createUserDto = openapi.components?.schemas?.CreateUserDto as any;

      expect(createUserDto.properties.email.pattern).toBe(
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
      );
    });

    it('should parse @deprecated tag', () => {
      const openapi = getOpenApiSpec();
      const userDto = openapi.components?.schemas?.UserDto as any;

      expect(userDto.properties.legacyField.deprecated).toBe(true);
    });
  });

  describe('Enum parsing', () => {
    it('should parse enum types with values', () => {
      const openapi = getOpenApiSpec();
      const genderSchema = openapi.components?.schemas?.Gender as any;
      const activityLevelSchema = openapi.components?.schemas?.ActivityLevel as any;

      expect(genderSchema).toBeDefined();
      expect(genderSchema.type).toBe('string');
      expect(genderSchema.enum).toEqual(['MALE', 'FEMALE', 'OTHER']);

      expect(activityLevelSchema).toBeDefined();
      expect(activityLevelSchema.type).toBe('string');
      expect(activityLevelSchema.enum).toEqual(['SEDENTARY', 'MODERATELY_ACTIVE', 'VERY_ACTIVE']);
    });

    it('should reference enum in property schema', () => {
      const openapi = getOpenApiSpec();
      const userDto = openapi.components?.schemas?.UserDto as any;

      // Gender property should reference the enum schema
      expect(userDto.properties.gender).toBeDefined();
      // Could be $ref or allOf with $ref
      const genderProp = userDto.properties.gender;
      const hasGenderRef = 
        genderProp.$ref === '#/components/schemas/Gender' ||
        (genderProp.allOf && genderProp.allOf.some((s: any) => s.$ref === '#/components/schemas/Gender'));
      expect(hasGenderRef).toBe(true);
    });
  });

  describe('Nullable types', () => {
    it('should handle nullable union types', () => {
      const openapi = getOpenApiSpec();
      const userDto = openapi.components?.schemas?.UserDto as any;

      expect(userDto.properties.email.nullable).toBe(true);
      expect(userDto.properties.name.nullable).toBe(true);
    });
  });

  describe('Generic wrapper types', () => {
    it('should resolve DataResponse<T> wrapper', () => {
      const openapi = getOpenApiSpec();
      const findOnePath = openapi.paths['/users/{id}']?.get;

      expect(findOnePath).toBeDefined();
      const responseSchema = (findOnePath?.responses?.['200'] as any)?.content?.['application/json']?.schema;
      
      expect(responseSchema).toBeDefined();
      expect(responseSchema.type).toBe('object');
      expect(responseSchema.properties.data).toBeDefined();
      expect(responseSchema.properties.data.$ref).toBe('#/components/schemas/UserDto');
    });

    it('should resolve PaginatedResponse<T> wrapper', () => {
      const openapi = getOpenApiSpec();
      const findAllPath = openapi.paths['/users']?.get;

      expect(findAllPath).toBeDefined();
      const responseSchema = (findAllPath?.responses?.['200'] as any)?.content?.['application/json']?.schema;
      
      expect(responseSchema).toBeDefined();
      expect(responseSchema.type).toBe('object');
      expect(responseSchema.properties.data).toBeDefined();
      expect(responseSchema.properties.data.type).toBe('array');
      expect(responseSchema.properties.data.items.$ref).toBe('#/components/schemas/UserDto');
      expect(responseSchema.properties.nextToken).toBeDefined();
      expect(responseSchema.properties.totalCount).toBeDefined();
    });
  });

  describe('Date types', () => {
    it('should convert Date to string with date-time format', () => {
      const openapi = getOpenApiSpec();
      const userDto = openapi.components?.schemas?.UserDto as any;

      expect(userDto.properties.createdAt.type).toBe('string');
      expect(userDto.properties.createdAt.format).toBe('date-time');
    });
  });

  describe('API Tags', () => {
    it('should parse @ApiTags decorator', () => {
      const openapi = getOpenApiSpec();
      const findAllPath = openapi.paths['/users']?.get;

      expect(findAllPath?.tags).toContain('Users');
    });
  });

  describe('Required properties', () => {
    it('should mark non-optional properties as required', () => {
      const openapi = getOpenApiSpec();
      const userDto = openapi.components?.schemas?.UserDto as any;

      expect(userDto.required).toContain('id');
      expect(userDto.required).toContain('email');
      expect(userDto.required).toContain('createdAt');
      expect(userDto.required).not.toContain('age');
      expect(userDto.required).not.toContain('legacyField');
    });
  });

  describe('Record types (Issue #89)', () => {
    it('should handle Record<string, unknown> without creating invalid schema name', () => {
      const openapi = getOpenApiSpec();
      const createUserDto = openapi.components?.schemas?.CreateUserDto as any;

      // meta property should be object with additionalProperties
      expect(createUserDto.properties.meta).toBeDefined();
      expect(createUserDto.properties.meta.type).toBe('object');
      expect(createUserDto.properties.meta.additionalProperties).toBe(true);

      // Should NOT have a schema with invalid name containing comma and space
      expect(openapi.components?.schemas?.['string, unknown']).toBeUndefined();
    });
  });
});
