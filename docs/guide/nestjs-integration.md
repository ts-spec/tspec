---
outline: deep
---

# NestJS Integration

Tspec supports generating OpenAPI specifications directly from [NestJS](https://nestjs.com/) controllers. This allows you to automatically generate API documentation without manually defining type specifications.

## Prerequisites

Before using NestJS integration, make sure you have:

- A NestJS project with TypeScript
- Controllers using NestJS decorators (`@Controller`, `@Get`, `@Post`, etc.)

## Installation

Install tspec in your NestJS project:

::: code-group
```bash [yarn]
yarn add tspec
```

```bash [npm]
npm install tspec
```

```bash [pnpm]
pnpm add tspec
```
:::

## Basic Usage

### Example Controller

Assume you have the following NestJS controller:

::: code-group
```ts[books.controller.ts]
import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';

interface Book {
  id: number;
  title: string;
  author: string;
}

interface CreateBookDto {
  title: string;
  author: string;
}

interface BookListQuery {
  page?: number;
  limit?: number;
}

/**
 * Books API Controller
 */
@Controller('books')
export class BooksController {
  /**
   * Get all books with pagination
   * @summary List all books
   */
  @Get()
  findAll(@Query() query: BookListQuery): Promise<Book[]> {
    // implementation
  }

  /**
   * Get a single book by ID
   * @summary Get book by ID
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    // implementation
  }

  /**
   * Create a new book
   * @summary Create book
   */
  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    // implementation
  }

  /**
   * Update an existing book
   * @summary Update book
   */
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: CreateBookDto,
  ): Promise<Book> {
    // implementation
  }

  /**
   * Delete a book
   * @summary Delete book
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    // implementation
  }
}
```
:::

### Generate OpenAPI Spec

Generate OpenAPI specification directly from your NestJS controllers using the `--nestjs` flag:

::: code-group
```bash [yarn]
yarn tspec generate --nestjs
```

```bash [npm]
npx tspec generate --nestjs
```

```bash [pnpm]
pnpm tspec generate --nestjs
```
:::

:::details Generated OpenAPI Spec
```yaml
openapi: 3.0.3
info:
  title: NestJS API
  version: 1.0.0
paths:
  /books:
    get:
      operationId: BooksController_findAll
      summary: List all books
      description: Get all books with pagination
      tags:
        - Books
      parameters:
        - name: page
          in: query
          required: false
          schema:
            type: number
        - name: limit
          in: query
          required: false
          schema:
            type: number
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Book'
    post:
      operationId: BooksController_create
      summary: Create book
      tags:
        - Books
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateBookDto'
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Book'
  /books/{id}:
    get:
      operationId: BooksController_findOne
      summary: Get book by ID
      tags:
        - Books
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Book'
    put:
      operationId: BooksController_update
      summary: Update book
      tags:
        - Books
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateBookDto'
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Book'
    delete:
      operationId: BooksController_remove
      summary: Delete book
      tags:
        - Books
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '204':
          description: No Content
```
:::

## CLI Options

When using `--nestjs` flag, the following options are available:

| Option | Default | Description |
|--------|---------|-------------|
| `--nestjs` | `false` | Enable NestJS controller parsing |
| `--tsconfigPath` | `tsconfig.json` | Path to TypeScript config file |
| `--controllerGlobs` | `src/**/*.controller.ts` | Glob patterns to find controller files |
| `--outputPath` | `openapi.json` | Output path for generated OpenAPI spec |
| `--openapiTitle` | `Tspec API` | API title in OpenAPI info |
| `--openapiVersion` | `0.0.1` | API version in OpenAPI info |
| `--openapiDescription` | `` | API description in OpenAPI info |

### Example with all options

```bash
npx tspec generate --nestjs \
  --tsconfigPath tsconfig.json \
  --controllerGlobs 'src/**/*.controller.ts' \
  --outputPath docs/openapi.json \
  --openapiTitle 'My NestJS API' \
  --openapiVersion '2.0.0' \
  --openapiDescription 'API documentation for my NestJS application'
```

## Supported Decorators

Tspec parses the following NestJS decorators:

### Controller Decorators
- `@Controller(path?)` - Defines the base path for all routes in the controller

### HTTP Method Decorators
- `@Get(path?)`
- `@Post(path?)`
- `@Put(path?)`
- `@Patch(path?)`
- `@Delete(path?)`
- `@Options(path?)`
- `@Head(path?)`

### Parameter Decorators
- `@Param(name?)` - Path parameters
- `@Query()` - Query parameters
- `@Body()` - Request body
- `@Headers()` - Header parameters

### Swagger Decorators
- `@ApiTags(...tags)` - Adds tags to all operations in the controller

## JSDoc Support

Tspec extracts documentation from JSDoc comments:

```ts
/**
 * This becomes the operation description
 * @summary This becomes the operation summary
 * @tag CustomTag
 */
@Get()
findAll(): Promise<Book[]> {
  // ...
}
```

## Limitations

The current NestJS integration has some limitations:

1. **Type inference**: Complex generic types may not be fully resolved
2. **Custom decorators**: Only standard NestJS decorators are supported
3. **Validation decorators**: `class-validator` decorators are not parsed
4. **Interceptors/Guards**: These are not reflected in the generated spec

::: tip
For more advanced use cases, consider using the standard Tspec approach with `Tspec.DefineApiSpec` alongside your NestJS controllers.
:::

## Programmatic API

You can also generate OpenAPI specs programmatically using the `generateNestTspec` function:

```ts
import { generateNestTspec } from 'tspec';

const spec = generateNestTspec({
  tsconfigPath: './tsconfig.json',
  controllerGlobs: ['src/**/*.controller.ts'],
  openapi: {
    title: 'My API',
    version: '1.0.0',
    description: 'My NestJS API documentation',
  },
});

// Use the spec object directly or write to file
console.log(JSON.stringify(spec, null, 2));
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `tsconfigPath` | `string` | `./tsconfig.json` | Path to TypeScript config file |
| `controllerGlobs` | `string[]` | `['src/**/*.controller.ts']` | Glob patterns to find controller files |
| `openapi.title` | `string` | `Tspec API` | API title |
| `openapi.version` | `string` | `0.0.1` | API version |
| `openapi.description` | `string` | - | API description |

## Using @ApiTags

Tspec supports the `@ApiTags` decorator from `@nestjs/swagger` to organize your API operations:

```ts
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users', 'Admin')
@Controller('users')
export class UsersController {
  @Get()
  findAll(): Promise<User[]> {
    // This operation will have tags: ['Users', 'Admin']
  }
}
```

You can also use enum values or constants:

```ts
enum ApiTag {
  USERS = 'users',
  ADMIN = 'admin',
}

@ApiTags(ApiTag.USERS, ApiTag.ADMIN)
@Controller('users')
export class UsersController {
  // ...
}
```

## Combining with Standard Tspec

You can use both approaches in the same project:

1. Use `--nestjs` flag for quick documentation of existing controllers
2. Use `Tspec.DefineApiSpec` for APIs that need more detailed specifications

```bash
# Generate from NestJS controllers
npx tspec generate --nestjs --outputPath openapi-nest.json

# Generate from Tspec definitions
npx tspec generate --outputPath openapi-tspec.json
```
