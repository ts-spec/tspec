# tspec
Generate OpenAPI Specification from TypeScript types

## How to use?
```ts
import { Tspec, generateSpec } from 'tspec'
import { Request, Response } from 'express';

// 1. Define API Specifications by Handler
export type PetApiSpec = Tspec.DefineApiSpec<{
  specs: {
    '/pet/{id}': {
      get: { summary: 'Find pet by ID', handler: typeof getPetById },
    },
  },
}>;

const getPetById = async (req: Request<PetParams>, res: Response<Pet>) => {
  const { id } = req.params;
  res.json({ id, name: 'dog' });
}

interface PetParams {
  /**
   * pet id
   * @examples [1234]
   * */
  id: string,
}

interface Pet {
  id: string,
  name: string,
}

// 2. Generate OpenAPI Spec Automatically
const openAPISpec = await generateSpec();
```

## Philosophy

> Type is all you need for generating Open API Specification
> 

No need to tediously write OpenAPI Schema for each API.

You just need to pass your types to `ApiSpec` to generate an OpenAPI Specification.

Utilize `ApiSpec` types as a SSOT(Single Source of Truth) for type-hints, documentation and validation

