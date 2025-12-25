import { describe, it, expect } from 'vitest';
import path from 'path';
import { parseNestControllers } from '../../nestjs/parser';
import { generateOpenApiFromNest } from '../../nestjs/openapiGenerator';

describe('NestJS Schema Generation', () => {
  const fixturesPath = path.join(__dirname, 'fixtures');

  const getOpenApiSpec = async () => {
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
    it('should parse @example tag', async () => {
      const openapi = await getOpenApiSpec();
      const userDto = openapi.components?.schemas?.UserDto as any;

      expect(userDto).toBeDefined();
      expect(userDto.properties.id.example).toBe(1);
      expect(userDto.properties.email.example).toBe('user@example.com');
      expect(userDto.properties.name.example).toBe('홍길동');
    });

    it('should parse @minimum and @maximum tags', async () => {
      const openapi = await getOpenApiSpec();
      const userDto = openapi.components?.schemas?.UserDto as any;

      expect(userDto.properties.age.minimum).toBe(0);
      expect(userDto.properties.age.maximum).toBe(150);
    });

    it('should parse @minLength and @maxLength tags', async () => {
      const openapi = await getOpenApiSpec();
      const createUserDto = openapi.components?.schemas?.CreateUserDto as any;

      expect(createUserDto.properties.name.minLength).toBe(2);
      expect(createUserDto.properties.name.maxLength).toBe(50);
      expect(createUserDto.properties.password.minLength).toBe(8);
    });

    it('should parse @pattern tag', async () => {
      const openapi = await getOpenApiSpec();
      const createUserDto = openapi.components?.schemas?.CreateUserDto as any;

      expect(createUserDto.properties.email.pattern).toBe(
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
      );
    });

    it('should parse @deprecated tag', async () => {
      const openapi = await getOpenApiSpec();
      const userDto = openapi.components?.schemas?.UserDto as any;

      expect(userDto.properties.legacyField.deprecated).toBe(true);
    });
  });

  describe('Enum parsing', () => {
    it('should parse enum types with values', async () => {
      const openapi = await getOpenApiSpec();
      const genderSchema = openapi.components?.schemas?.Gender as any;
      const activityLevelSchema = openapi.components?.schemas?.ActivityLevel as any;

      expect(genderSchema).toBeDefined();
      expect(genderSchema.type).toBe('string');
      expect(genderSchema.enum).toEqual(['MALE', 'FEMALE', 'OTHER']);

      expect(activityLevelSchema).toBeDefined();
      expect(activityLevelSchema.type).toBe('string');
      expect(activityLevelSchema.enum).toEqual(['SEDENTARY', 'MODERATELY_ACTIVE', 'VERY_ACTIVE']);
    });

    it('should reference enum in property schema', async () => {
      const openapi = await getOpenApiSpec();
      const userDto = openapi.components?.schemas?.UserDto as any;

      // Gender property should reference the enum schema
      expect(userDto.properties.gender).toBeDefined();
      // Could be $ref or allOf with $ref (for nullable types)
      const genderProp = userDto.properties.gender;
      const hasGenderRef = 
        genderProp.$ref === '#/components/schemas/Gender' ||
        (genderProp.allOf && genderProp.allOf.some((s: any) => s.$ref === '#/components/schemas/Gender'));
      expect(hasGenderRef).toBe(true);
    });
  });

  describe('Nullable types', () => {
    it('should handle nullable union types', async () => {
      const openapi = await getOpenApiSpec();
      const userDto = openapi.components?.schemas?.UserDto as any;

      expect(userDto.properties.email.nullable).toBe(true);
      expect(userDto.properties.name.nullable).toBe(true);
    });
  });

  describe('Generic wrapper types', () => {
    it('should resolve DataResponse<T> wrapper', async () => {
      const openapi = await getOpenApiSpec();
      const findOnePath = openapi.paths['/users/{id}']?.get;

      expect(findOnePath).toBeDefined();
      const responseSchema = (findOnePath?.responses?.['200'] as any)?.content?.['application/json']?.schema;
      
      expect(responseSchema).toBeDefined();
      expect(responseSchema.type).toBe('object');
      expect(responseSchema.properties.data).toBeDefined();
      expect(responseSchema.properties.data.$ref).toBe('#/components/schemas/UserDto');
    });

    it('should resolve PaginatedResponse<T> wrapper', async () => {
      const openapi = await getOpenApiSpec();
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
    it('should convert Date to string with date-time format', async () => {
      const openapi = await getOpenApiSpec();
      const userDto = openapi.components?.schemas?.UserDto as any;

      expect(userDto.properties.createdAt.type).toBe('string');
      expect(userDto.properties.createdAt.format).toBe('date-time');
    });
  });

  describe('API Tags', () => {
    it('should parse @ApiTags decorator', async () => {
      const openapi = await getOpenApiSpec();
      const findAllPath = openapi.paths['/users']?.get;

      expect(findAllPath?.tags).toContain('Users');
    });
  });

  describe('Required properties', () => {
    it('should mark non-optional properties as required', async () => {
      const openapi = await getOpenApiSpec();
      const userDto = openapi.components?.schemas?.UserDto as any;

      expect(userDto.required).toContain('id');
      expect(userDto.required).toContain('email');
      expect(userDto.required).toContain('createdAt');
      expect(userDto.required).not.toContain('age');
      expect(userDto.required).not.toContain('legacyField');
    });
  });

  describe('Record types (Issue #89)', () => {
    it('should handle Record<string, unknown> without creating invalid schema name', async () => {
      const openapi = await getOpenApiSpec();
      const createUserDto = openapi.components?.schemas?.CreateUserDto as any;

      // meta property should be object with additionalProperties
      expect(createUserDto.properties.meta).toBeDefined();
      expect(createUserDto.properties.meta.type).toBe('object');
      expect(createUserDto.properties.meta.additionalProperties).toBe(true);

      // Should NOT have a schema with invalid name containing comma and space
      expect(openapi.components?.schemas?.['string, unknown']).toBeUndefined();
    });
  });

  describe('Array property types', () => {
    it('should handle array properties correctly (not as Record/Map)', async () => {
      const openapi = await getOpenApiSpec();
      const userListResponseDto = openapi.components?.schemas?.UserListResponseDto as any;

      expect(userListResponseDto).toBeDefined();
      expect(userListResponseDto.properties.users).toBeDefined();
      
      // users property should be an array, NOT an object with additionalProperties
      expect(userListResponseDto.properties.users.type).toBe('array');
      expect(userListResponseDto.properties.users.items).toBeDefined();
      expect(userListResponseDto.properties.users.items.$ref).toBe('#/components/schemas/UserDto');
      
      // Should NOT have additionalProperties (which would indicate Record/Map treatment)
      expect(userListResponseDto.properties.users.additionalProperties).toBeUndefined();
      
      // totalCount should be a number
      expect(userListResponseDto.properties.totalCount.type).toBe('number');
    });
  });

  describe('@Query() DTO expansion (Issue #91)', () => {
    it('should expand @Query() DTO into individual query parameters', async () => {
      const openapi = await getOpenApiSpec();
      const findAllPath = openapi.paths['/users']?.get;

      expect(findAllPath).toBeDefined();
      expect(findAllPath?.parameters).toBeDefined();
      
      const params = findAllPath?.parameters as any[];
      
      // Should have individual query parameters from ListUsersQueryDto
      const nextTokenParam = params.find(p => p.name === 'nextToken');
      const limitParam = params.find(p => p.name === 'limit');
      const offsetParam = params.find(p => p.name === 'offset');
      const nameParam = params.find(p => p.name === 'name');

      expect(nextTokenParam).toBeDefined();
      expect(nextTokenParam.in).toBe('query');
      expect(nextTokenParam.required).toBe(false);
      expect(nextTokenParam.schema.type).toBe('string');
      expect(nextTokenParam.example).toBe('eyJvZmZzZXQiOjAsImxpbWl0IjoyMH0=');

      expect(limitParam).toBeDefined();
      expect(limitParam.in).toBe('query');
      expect(limitParam.required).toBe(false);
      expect(limitParam.schema.type).toBe('number');
      expect(limitParam.schema.minimum).toBe(1);
      expect(limitParam.schema.maximum).toBe(100);
      expect(limitParam.schema.default).toBe(20);

      expect(offsetParam).toBeDefined();
      expect(offsetParam.in).toBe('query');
      expect(offsetParam.required).toBe(false);
      expect(offsetParam.schema.type).toBe('number');
      expect(offsetParam.schema.minimum).toBe(0);
      expect(offsetParam.schema.default).toBe(0);

      expect(nameParam).toBeDefined();
      expect(nameParam.in).toBe('query');
      expect(nameParam.required).toBe(false);
      expect(nameParam.schema.type).toBe('string');
      expect(nameParam.example).toBe('홍길동');
    });

    it('should not have a single "query" parameter for DTO', async () => {
      const openapi = await getOpenApiSpec();
      const findAllPath = openapi.paths['/users']?.get;
      
      const params = findAllPath?.parameters as any[];
      
      // Should NOT have a single "query" parameter
      const queryParam = params.find(p => p.name === 'query');
      expect(queryParam).toBeUndefined();
    });
  });
});
