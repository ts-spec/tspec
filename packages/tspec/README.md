# Tspec
[![npm](https://badge.fury.io/js/tspec.svg)](https://badge.fury.io/js/tspec) [![downloads](https://img.shields.io/npm/dm/tspec.svg)](https://www.npmjs.com/package/tspec) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Type-driven OpenAPI Specification Generator for TypeScript

> Automatically parses your TypeScript types and generates up-to-date OpenAPI specification with beautiful Swagger UI.


## Why tspec?
- **Code First**: Rely on TypeScript type and JSDoc to generate OpenAPI Specification.
- **Easy to learn**: No need to learn new OpenAPI Spec syntax. Just use TypeScript types.
- **Easy to use**: Only few lines of code are needed to generate OpenAPI Specification.
- **Flexible**: You can use any framework you want. It doesn't impose any framework-specific constraints.


## Usage
### Installation
```bash
yarn add tspec # or npm install tspec
```

### 1. Define ApiSpec
```ts
import { Tspec } from "tspec";

/** Schema Description */
interface Book {
  /** Field description */
  id: number;
  title: string;
  description?: string;
}

export type BookApiSpec = Tspec.DefineApiSpec<{
  tags: ['Book'],
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

### 2. Generate OpenAPI Spec
```bash
yarn tspec generate --outputPath openapi.json
# or npx tspec generate --outputPath openapi.json
```

```json
{
  "info": {
    "title": "Tspec API",
    "version": "0.0.1"
  },
  "openapi": "3.0.3",
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
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Book"
                  }
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
        "description": "Book Schema",
        "type": "object",
        "properties": {
          "id": {
            "description": "Book ID",
            "type": "number"
          },
          "title": {
            "description": "Book title",
            "type": "string"
          },
          "description": {
            "description": "Book description",
            "type": "string"
          }
        },
        "additionalProperties": false,
        "required": [
          "id",
          "title"
        ]
      }
    }
  }
}
```

### 3. Serve Swagger UI
```bash
yarn tspec server
# or npx tspec server
```

### 4. Express Integration
```ts
import { Tspec, TspecDocsMiddleware } from "tspec";
import express, { Request, Response } from "express";

const getBookById = (
  req: Request<{ id: string }>, res: Response<Book>,
) => {
  res.json({
    id: +req.params.id,
    title: 'Book Title',
    description: 'Book Description',
  });
}

export type BookApiSpec = Tspec.DefineApiSpec<{
  tags: ['Book'],
  paths: {
    '/books/{id}': {
      get: {
        summary: 'Get book by id',
        handler: typeof getBookById
      },
    },
  }
}>;

const initServer = async () => {
  const app = express()
  app.get('/books/:id', getBookById);
  app.use('/docs', await TspecDocsMiddleware());
  app.listen(3000);
}
initServer();
```

## Documentation
https://ts-spec.github.io/tspec

