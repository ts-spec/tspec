# Tspec

Type-driven API Documentation library for [TypeScript](https://www.typescriptlang.org/).

> Automatically parses your TypeScript types and generates up-to-date OpenAPI specification with beautiful Swagger UI.


[![npm](https://badge.fury.io/js/tspec.svg)](https://badge.fury.io/js/tspec) [![downloads](https://img.shields.io/npm/dm/tspec.svg)](https://www.npmjs.com/package/tspec) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why tspec?
- **Code First**: Rely on TypeScript type and JSDoc to generate OpenAPI Specification.
- **Easy to learn**: No need to learn new OpenAPI Spec syntax. Just use TypeScript types.
- **Easy to use**: Only few lines of code are needed to generate OpenAPI Specification.
- **Flexible**: You can use any framework you want. It doesn't impose any framework-specific constraints.

## Installation
```bash
npm install tspec
```


## Usage
```ts
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

Run the following command to generate OpenAPI Spec:

```bash
npx tspec generate --outputPath openapi.json
```
(For readability, the generated OpenAPI Spec is formatted with yaml)

```yaml
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

If you want to serve Swagger UI, run the following command:

```bash
npx tspec server --port 3000
```

Then, you can access Swagger UI at `http://localhost:3000`

![getting-started-swagger-ui-1](https://github.com/ts-spec/tspec/assets/13609011/149817a2-fe74-451a-a429-66f4674510e3)

And you can see schema definitions in the `Schemas` tab.

![getting-started-swagger-ui-2](https://github.com/ts-spec/tspec/assets/13609011/b7cebc87-c930-43f6-85d7-92ae5734ad9d)


## Express Integration

Tspec automatically parses your [Express](https://expressjs.com/) handler type to generate parameters(`path`, `query`, `body`) and responses schemas.
And you can use `TspecDocsMiddleware` to serve Swagger UI.

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


---
Give a ⭐️ if you find this project useful and to show your appreciation! [![Stars](https://img.shields.io/github/stars/ts-spec/tspec?style=social)](https://github.com/ts-spec/tspec/stargazers)

