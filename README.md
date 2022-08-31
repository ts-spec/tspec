# tspec
Type driven OpenAPI Specification

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
