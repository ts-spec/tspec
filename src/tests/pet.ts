import fs from 'fs/promises';

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
(async () => {
  const openAPISpec = await generateTspec();
  fs.writeFile('src/tests/pet.json', JSON.stringify(openAPISpec, null, 2));
})();
