# tspec
Generate OpenAPI Specification from TypeScript types

## How to use?
```ts
import { Tspec, generateSpec } from 'tspec'

// 1. Define API Specifications
export type PetApiSpec = Tspec.RegisterApiSpec<{
  baseUrl: '/pet',
  specs: {
    'GET /{id}': {
      summary: 'Find pet by ID',
      path: {
        /**
         * pet id
         * @examples [1234]
         * */
        id: string,
      },
      responses: { 200: Pet },
    },
  },
}>;

// 2. generate OpenAPI Spec
const openAPISpec = await generateSpec();
```

## Philosophy

> Type is all you need for generating Open API Specification
> 

No need to tediously write OpenAPI Schema for each API.

You just need to pass your types to `ApiSpec` to generate an OpenAPI Specification.

Utilize `ApiSpec` types as a SSOT(Single Source of Truth) for type-hints, documentation and validation

