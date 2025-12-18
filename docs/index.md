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
  # - title: TypeScript ♥ OpenAPI
    icon: 📝
    details: Automatically parses your TypeScript types and generates up-to-date OpenAPI specification.
  - title: Swagger UI Integration
    icon: 💎
    details: Tspec integrates Swagger UI to provide a beautiful and interactive API documentation.
  - title: Zero Configuration
    icon: ⚡️
    details: Tspec is designed to be zero-configuration. You can start using it right away without any configuration.
  - title: NestJS Support
    icon: 🚀
    details: Generate OpenAPI spec directly from NestJS controllers with a single --nestjs flag.
---

## Two Ways to Generate OpenAPI

Tspec supports both **type-first** and **NestJS controller** approaches. Choose the one that fits your project!

::: code-group

```ts [Type-First Approach]
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

```ts [NestJS Controller]
import { Controller, Get, Param } from '@nestjs/common';

interface Book {
  id: number;
  title: string;
}

@Controller('books')
export class BooksController {
  /**
   * @summary Get book by id
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    // ...
  }
}

// Run: npx tspec generate --nestjs
```

:::

Both approaches generate the same OpenAPI specification:

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

