import fs from 'fs/promises';

// eslint-disable-next-line import/no-unresolved
import { RequestHandler } from 'express';

import { Tspec, generateTspec } from '../index';

interface Pet {
  id: number,
  category: {
    id: number,
    name: string,
  },
  name: string,
  photoUrls: string[],
  tags: {
    id: number,
    name: string,
  }[],
  status: 'available' | 'pending' | 'sold',
}

interface GetPetPathParams {
  /**
   * pet id
   * @examples [1234]
   * */
  id: string,
}

const getPet: RequestHandler<GetPetPathParams, Pet> = (req, res) => {
  res.json({
    id: +req.params.id,
    category: {
      id: 1234,
      name: 'string',
    },
    name: 'doggie',
    photoUrls: ['string'],
    tags: [{
      id: 1234,
      name: 'string',
    }],
    status: 'available',
  });
};

// 1. Define API Specifications
export type PetApiSpec = Tspec.DefineApiSpec<{
  basePath: '/pet',
  paths: {
    '/{id}': {
        get: { summary: 'Find pet by ID', handler: typeof getPet },
    },
  },
}>;

// 2. generate OpenAPI Spec
(async () => {
  const openAPISpec = await generateTspec();
  fs.writeFile('src/tests/pet.json', JSON.stringify(openAPISpec, null, 2));
})();
