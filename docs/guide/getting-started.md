---
outline: deep
---

# Getting Started

On this page, we will learn how to use tspec to generate [OpenAPI Specification](https://swagger.io/specification/) from TypeScript types and serve it with [Swagger UI](https://swagger.io/tools/swagger-ui/).


## Installing

Assuming you have [Node.js](https://nodejs.org/en/) and [TypeScript](https://www.typescriptlang.org/) installed, create a new typescript project:

```bash
mkdir my-project
cd my-project
```

Then, initialize `tsconfig.json`:

```bash
tsc --init
```

Now, initialize `package.json` and install tspec:

::: code-group
```bash [yarn]
yarn init -y
yarn add tspec
```

```bash [npm]
npm init -y
npm install tspec
```

```bash [pnpm]
pnpm init -y
pnpm add tspec
```
:::

## Define ApiSpec

Tspec supports multiple ways to define API specifications depending on your framework.

::: code-group
```ts [Basic]
import { Tspec } from "tspec";

/** Schema description defined by JSDoc */
interface Book {
  /** Field description defined by JSDoc */
  id: number;
  title: string;
  description?: string;
}

export type BookApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/books/{id}': {
      get: {
        summary: 'Get book by id',
        path: { id: number },
        responses: { 200: Book },
      },
    },
  }
}>;
```

```ts [Express]
import { Request, Response } from 'express';
import { Tspec } from 'tspec';

interface Book {
  id: number;
  title: string;
}

// Define your Express handler with typed parameters
export const getBook = async (
  req: Request<{ id: string }>,
  res: Response<Book>,
) => {
  res.json({ id: Number(req.params.id), title: 'Book Title' });
};

// Use handler type to auto-generate parameters and responses
export type BookApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/books/{id}': {
      get: {
        summary: 'Get book by id',
        handler: typeof getBook,
      },
    },
  },
}>;
```

```ts [NestJS]
import { Controller, Get, Param } from '@nestjs/common';

interface Book {
  id: number;
  title: string;
}

/**
 * Books API Controller
 */
@Controller('books')
export class BooksController {
  /**
   * Get a single book by ID
   * @summary Get book by ID
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    return Promise.resolve({ id: Number(id), title: 'Book Title' });
  }
}

// No need to define ApiSpec manually!
// Use `tspec generate --nestjs` to generate OpenAPI spec
```
:::

## Generate OpenAPI Spec

Now, let's generate OpenAPI Spec:

::: code-group
```bash [Basic / Express]
npx tspec generate --outputPath openapi.json
```

```bash [NestJS]
npx tspec generate --nestjs --outputPath openapi.json
```
:::

::: tip
- **Basic / Express**: Tspec automatically parses `Tspec.DefineApiSpec` from any files that match `**/*.ts`.
- **NestJS**: Use the `--nestjs` flag to parse controllers directly. Default glob is `src/**/*.controller.ts`.
- For more details, see [Express Integration](/guide/express-integration) and [NestJS Integration](/guide/nestjs-integration).
:::

:::details Generated OpenAPI Spec
(For readability, the generated OpenAPI Spec is formatted with yaml)

```yaml{6,27}
openapi: 3.0.3
info:
  title: Tspec API
  version: 0.0.1
paths:
  /books/{id}:
    get:
      operationId: BookApiSpec_get_/books/{id}
      tags:
        - Book
      summary: Get book by id
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: number
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Book'
components:
  schemas:
    Book:
      description: Schema description defined by JSDoc
      type: object
      properties:
        id:
          description: Field description defined by JSDoc
          type: number
        title:
          type: string
        description:
          type: string
      required:
        - id
        - title
```
:::

## Serve OpenAPI Spec

Now, let's serve the OpenAPI Spec with [Swagger UI](https://swagger.io/tools/swagger-ui/):

::: code-group
```bash [yarn]
yarn tspec server --port 3000
```

```bash [npm]
npx tspec server --port 3000
```

```bash [pnpm]
pnpm tspec server --port 3000
```
:::

Then, open `http://localhost:3000/docs` in your browser.

You will see the Swagger UI page:

![Swagger UI API](/assets/images/getting-started-swagger-ui-1.png)

And you can see schema definitions in the `Schemas` tab.

![Swagger UI Schema](/assets/images/getting-started-swagger-ui-2.png)
