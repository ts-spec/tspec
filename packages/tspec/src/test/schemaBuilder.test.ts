import { describe, it, expect } from 'vitest';
import {
  buildSchemaRef,
  buildPrimitiveSchema,
  createSchemaBuilderContext,
  unwrapPromise,
  sanitizeSchemaName,
} from '../generator/schemaBuilder';

describe('schemaBuilder', () => {
  describe('sanitizeSchemaName', () => {
    it('should sanitize Record<string, unknown> to valid name', () => {
      expect(sanitizeSchemaName('Record<string, unknown>')).toBe('Record_string_unknown_');
    });

    it('should sanitize union types', () => {
      expect(sanitizeSchemaName('string | null')).toBe('string_or_null');
      expect(sanitizeSchemaName('User | Admin')).toBe('User_or_Admin');
    });

    it('should sanitize generic types', () => {
      expect(sanitizeSchemaName('Array<string>')).toBe('Array_string_');
      expect(sanitizeSchemaName('Map<string, number>')).toBe('Map_string_number_');
    });

    it('should handle simple type names unchanged', () => {
      expect(sanitizeSchemaName('User')).toBe('User');
      expect(sanitizeSchemaName('CreateUserDto')).toBe('CreateUserDto');
    });

    it('should collapse multiple underscores', () => {
      expect(sanitizeSchemaName('Foo<Bar, Baz>')).toBe('Foo_Bar_Baz_');
    });
  });

  describe('buildPrimitiveSchema', () => {
    it('should return string schema for string type', () => {
      expect(buildPrimitiveSchema('string')).toEqual({ type: 'string' });
    });

    it('should return number schema for number type', () => {
      expect(buildPrimitiveSchema('number')).toEqual({ type: 'number' });
    });

    it('should return boolean schema for boolean type', () => {
      expect(buildPrimitiveSchema('boolean')).toEqual({ type: 'boolean' });
    });

    it('should return empty schema for any/unknown types', () => {
      expect(buildPrimitiveSchema('any')).toEqual({});
      expect(buildPrimitiveSchema('unknown')).toEqual({});
    });
  });

  describe('unwrapPromise', () => {
    it('should unwrap Promise<T> to T', () => {
      expect(unwrapPromise('Promise<string>')).toBe('string');
      expect(unwrapPromise('Promise<User>')).toBe('User');
    });

    it('should return type as-is if not a Promise', () => {
      expect(unwrapPromise('string')).toBe('string');
      expect(unwrapPromise('User')).toBe('User');
    });
  });

  describe('buildSchemaRef', () => {
    describe('Unknown generic types', () => {
      it('should handle Record<string, unknown> as object with additionalProperties: true', () => {
        const context = createSchemaBuilderContext();
        const schema = buildSchemaRef('Record<string, unknown>', context);

        // Unknown generic types fallback to object with additionalProperties
        expect(schema).toEqual({
          type: 'object',
          additionalProperties: true,
        });
        // Should NOT create a schema entry with invalid name
        expect(context.schemas['string, unknown']).toBeUndefined();
      });

      it('should handle Map<string, number> with typed additionalProperties', () => {
        const context = createSchemaBuilderContext();
        const schema = buildSchemaRef('Map<string, number>', context);

        expect(schema).toEqual({
          type: 'object',
          additionalProperties: { type: 'number' },
        });
      });
    });

    describe('Array types', () => {
      it('should handle T[] syntax', () => {
        const context = createSchemaBuilderContext();
        const schema = buildSchemaRef('string[]', context);

        expect(schema).toEqual({
          type: 'array',
          items: { type: 'string' },
        });
      });

      it('should handle Array<T> syntax', () => {
        const context = createSchemaBuilderContext();
        const schema = buildSchemaRef('Array<number>', context);

        expect(schema).toEqual({
          type: 'array',
          items: { type: 'number' },
        });
      });
    });

    describe('Nullable types', () => {
      it('should handle T | null', () => {
        const context = createSchemaBuilderContext();
        const schema = buildSchemaRef('string | null', context);

        expect(schema).toEqual({
          type: 'string',
          nullable: true,
        });
      });

      it('should handle T | undefined', () => {
        const context = createSchemaBuilderContext();
        const schema = buildSchemaRef('number | undefined', context);

        expect(schema).toEqual({
          type: 'number',
          nullable: true,
        });
      });
    });

    describe('Date type', () => {
      it('should convert Date to string with date-time format', () => {
        const context = createSchemaBuilderContext();
        const schema = buildSchemaRef('Date', context);

        expect(schema).toEqual({
          type: 'string',
          format: 'date-time',
        });
      });
    });

    describe('Inline object types', () => {
      it('should parse inline object type', () => {
        const context = createSchemaBuilderContext();
        const schema = buildSchemaRef('{ name: string; age: number }', context);

        expect(schema).toEqual({
          type: 'object',
          properties: {
            name: { type: 'string' },
            age: { type: 'number' },
          },
          required: ['name', 'age'],
        });
      });

      it('should handle optional properties in inline object', () => {
        const context = createSchemaBuilderContext();
        const schema = buildSchemaRef('{ name: string; age?: number }', context);

        expect(schema).toEqual({
          type: 'object',
          properties: {
            name: { type: 'string' },
            age: { type: 'number' },
          },
          required: ['name'],
        });
      });
    });
  });
});
