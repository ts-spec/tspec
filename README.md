# tspec
Type-based OpenAPI Specification

## How to use?
```ts
import { DefineApiSpec, generateSpec } from 'tspec'

export type GetBookApiSpec = DefineApiSpec<{
  url: 'GET /books/{id}',
  summary: 'Retrieve a book',
  description: 'Retrieve a book',
  tags: ['Book'],
  path: {
    /**
     * Book id
     * @example 1234
     */
    id: number,
  },
  response: Book,
}>;

declare module 'tspec' {
  interface ApiSpec {
    getBook: GetBookApiSpec,
  }
}

// generate OpenAPI Spec
const openAPISpec = generateSpec(options);

```

## Philosophy

> Type is all you need for generating Open API Specification
> 

No need to tediously write OpenAPI Schema for each API.

You just need to pass your types to `ApiSpec` to generate an OpenAPI Specification.

Utilize `ApiSpec` types as a SSOT(Single Source of Truth) for type-hints, documentation and validation

