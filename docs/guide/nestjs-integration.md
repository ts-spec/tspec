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
| `--specPathGlobs` | `src/**/*.controller.ts` | Glob patterns to find controller files |
| `--outputPath` | `openapi.json` | Output path for generated OpenAPI spec |
| `--openapiTitle` | `Tspec API` | API title in OpenAPI info |
| `--openapiVersion` | `0.0.1` | API version in OpenAPI info |
| `--openapiDescription` | `` | API description in OpenAPI info |

### Example with all options

```bash
npx tspec generate --nestjs \
  --tsconfigPath tsconfig.json \
  --specPathGlobs 'src/**/*.controller.ts' \
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
- `@ApiResponse({ status, description?, type? })` - Defines response status codes and types
- `@ApiBearerAuth(name?)` - Adds Bearer token authentication to the operation
- `@ApiBasicAuth(name?)` - Adds Basic authentication to the operation
- `@ApiOAuth2(scopes[], name?)` - Adds OAuth2 authentication with scopes
- `@ApiSecurity(name, scopes?)` - Adds custom security scheme

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
2. **Validation decorators**: `class-validator` decorators are not parsed
3. **Interceptors/Guards**: These are not reflected in the generated spec

::: tip
For more advanced use cases, consider using the standard Tspec approach with `Tspec.DefineApiSpec` alongside your NestJS controllers.
:::

## Programmatic API

You can generate OpenAPI specs programmatically using the `generateTspec` function with `nestjs: true`:

```ts
import { generateTspec } from 'tspec';

const spec = await generateTspec({
  tsconfigPath: './tsconfig.json',
  specPathGlobs: ['src/**/*.controller.ts'],
  nestjs: true,
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
| `specPathGlobs` | `string[]` | `['src/**/*.controller.ts']` | Glob patterns to find controller files |
| `nestjs` | `boolean` | `false` | Enable NestJS controller parsing mode |
| `outputPath` | `string` | - | Output path for generated OpenAPI spec |
| `openapi.title` | `string` | `Tspec API` | API title |
| `openapi.version` | `string` | `0.0.1` | API version |
| `openapi.description` | `string` | - | API description |
| `openapi.securityDefinitions` | `object` | - | Security schemes |
| `openapi.servers` | `array` | - | Server URLs |
| `openapi.authDecorators` | `object` | - | Map custom decorator names to security scheme names |

## Using @ApiResponse

Tspec supports the `@ApiResponse` decorator from `@nestjs/swagger` to define multiple response types:

```ts
import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

class Book {
  id: number;
  title: string;
  author: string;
}

class ErrorResponse {
  message: string;
  statusCode: number;
}

@Controller('books')
export class BooksController {
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Book found', type: Book })
  @ApiResponse({ status: 404, description: 'Book not found', type: ErrorResponse })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findOne(@Param('id') id: string): Promise<Book> {
    // implementation
  }
}
```

This generates the following responses in OpenAPI:

```yaml
responses:
  '200':
    description: Book found
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Book'
  '404':
    description: Book not found
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/ErrorResponse'
  '500':
    description: Internal server error
```

::: tip
When `@ApiResponse` decorators are present, they override the default response generation based on return type.
:::

## Security Decorators

Tspec supports security decorators from `@nestjs/swagger` to add authentication requirements to your API operations.

### Using @ApiBearerAuth

Add Bearer token authentication to endpoints:

```ts
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  @Get('me')
  @ApiBearerAuth('bearerAuth')  // Uses 'bearerAuth' security scheme
  getCurrentUser(): Promise<User> {
    // This endpoint requires Bearer token authentication
  }

  @Get('profile')
  @ApiBearerAuth()  // Uses default 'bearer' security scheme
  getProfile(): Promise<UserProfile> {
    // ...
  }
}
```

Make sure to define the security scheme in your config:

```json
{
  "nestjs": true,
  "openapi": {
    "securityDefinitions": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  }
}
```

This generates:

```yaml
paths:
  /users/me:
    get:
      security:
        - bearerAuth: []
```

### Using @ApiOAuth2

Add OAuth2 authentication with scopes:

```ts
@Get('admin')
@ApiOAuth2(['read', 'write'], 'oauth2Auth')
getAdminData(): Promise<AdminData> {
  // Requires OAuth2 with read and write scopes
}
```

### Custom Auth Decorators

If you use composite decorators that wrap security decorators (e.g., using `applyDecorators`), you can configure Tspec to recognize them:

```ts
// auth.decorator.ts
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';

export function Auth(): MethodDecorator & ClassDecorator {
  return applyDecorators(
    UseGuards(AuthGuard),
    ApiBearerAuth('access-token'),
  );
}

export function AdminAuth(): MethodDecorator & ClassDecorator {
  return applyDecorators(
    UseGuards(AuthGuard, AdminGuard),
    ApiBearerAuth('access-token'),
  );
}
```

Configure `authDecorators` in your tspec config to map custom decorators to security schemes:

```json
{
  "nestjs": true,
  "openapi": {
    "securityDefinitions": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "authDecorators": {
      "Auth": "bearerAuth",
      "AdminAuth": "bearerAuth"
    }
  }
}
```

Now your custom decorators will be recognized:

```ts
@Controller('users')
export class UsersController {
  @Get('me')
  @Auth()  // ✅ Recognized as bearerAuth
  getCurrentUser(): Promise<User> {
    // ...
  }

  @Get('admin')
  @AdminAuth()  // ✅ Recognized as bearerAuth
  getAdminData(): Promise<AdminData> {
    // ...
  }
}
```

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
