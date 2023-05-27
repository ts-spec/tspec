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

Then, initialize `package.json` and `tsconfig.json`:

::: code-group
```bash [yarn]
yarn init -y
tsc --init
```

```bash [npm]
npm init -y
tsc --init
```

```bash [pnpm]
pnpm init -y
tsc --init
```
:::

Now, install tspec:

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

## Define ApiSpec

Let's define a simple `Book` type and `BookApiSpec`:

::: code-group
```ts[index.ts]
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
:::

## Generate OpenAPI Spec

Now, let's generate OpenAPI Spec from `BookApiSpec`:

::: code-group
```bash [yarn]
yarn tspec generate --outputPath openapi.json
```

```bash [npm]
npx tspec generate --outputPath openapi.json
```

```bash [pnpm]
pnpm tspec generate --outputPath openapi.json
```
:::

The generated OpenAPI Spec will look like this:

(For readability, the generated OpenAPI Spec is formatted with yaml)

::: code-group
```yaml[openapi.yaml]
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

```json[openapi.json]
{
  "openapi": "3.0.3",
  "info": {
    "title": "Tspec API",
    "version": "0.0.1"
  },
  "paths": {
    "/books/{id}": {
      "get": {
        "operationId": "BookApiSpec_get_/books/{id}",
        "tags": [
          "Book"
        ],
        "summary": "Get book by id",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "number"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Book"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Book": {
        "description": "Schema description defined by JSDoc",
        "type": "object",
        "properties": {
          "id": {
            "description": "Field description defined by JSDoc",
            "type": "number"
          },
          "title": {
            "type": "string"
          },
          "description": {
            "type": "string"
          }
        },
        "required": [
          "id",
          "title"
        ]
      }
    }
  }
}
```
:::

::: tip
Tspec automatically parses ApiSpec from any files that match the glob pattern `**/*.ts` in the current working directory.

If you want to specify a different spec path, you can use the `--specPathGlobs` option.
:::


## Serve OpenAPI Spec

Now, let's serve the generated OpenAPI Spec with [Swagger UI](https://swagger.io/tools/swagger-ui/):

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

And you can see schema definitions by scrolling down:

![Swagger UI Schema](/assets/images/getting-started-swagger-ui-2.png)
