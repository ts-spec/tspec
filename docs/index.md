---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Tspec"
  text: "Type-driven\nAPI Documentation"
  tagline: Auto-generating REST API document based on TypeScript types
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub ⭐️
      link: https://github.com/ts-spec/tspec

features:
  - title: Type-driven OpenAPI
    icon: 📝
    details: Automatically parses your TypeScript types and generates up-to-date OpenAPI specification.
  - title: Swagger UI Integration
    icon: 💎
    details: Tspec integrates Swagger UI to provide a beautiful and interactive API documentation.
  - title: Zero Configuration
    icon: ⚡️
    details: Tspec is designed to be zero-configuration. You can start using it right away without any configuration.
  - title: Framework Agnostic
    icon: 🔌
    details: Works with any framework - Express, NestJS, Fastify, or standalone TypeScript projects.
---

## Integrations

Tspec supports multiple ways to generate OpenAPI specs. Choose the approach that fits your project!

::: code-group

```ts [Tspec Types]
import { Tspec } from "tspec";

interface Book {
  id: number;
  title: string;
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

// Run: npx tspec generate
```

```ts [Express]
import express from 'express';
import { Tspec } from 'tspec';

const app = express();

interface Book {
  id: number;
  title: string;
}

/** @summary Get book by id */
app.get('/books/:id', (req, res) => {
  const book: Book = { id: 1, title: 'Erta Ale' };
  res.json(book);
});

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

// Run: npx tspec generate
```

```ts [NestJS]
import { Controller, Get, Param } from '@nestjs/common';

interface Book {
  id: number;
  title: string;
}

@Controller('books')
export class BooksController {
  /** @summary Get book by id */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    // ...
  }
}

// Run: npx tspec generate --nestjs
```

:::

All approaches generate the same OpenAPI specification:

```yaml
paths:
  /books/{id}:
    get:
      summary: Get book by id
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Book'
```

<div class="integration-links">

**Learn more:** [Tspec Types](/guide/defining-api-spec) · [Express](/guide/express-integration) · [NestJS](/guide/nestjs-integration)

</div>

