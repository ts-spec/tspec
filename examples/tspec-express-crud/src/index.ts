import express from 'express';
import { RequestHandler } from 'express';
import { Tspec, generateTspec } from 'tspec';
import fs from 'fs';

const app = express();

interface BaseParams<IDType = number> {
  id: IDType,
}

type DogBreed = 'labrador' | 'german shepherd' | 'golden retriever'

interface DogDetails {
  name: string,
  breed: DogBreed,
  adopted_at: Date | null,
  birth_date: Date | null,
}

interface APIResponse<Data> {
  data: Data,
  message: string,
}

interface Pagination {
  page: number,
  limit: number,
  breed: DogBreed,
}

interface Empty {

}

type Dog = BaseParams & DogDetails

const getDogs: RequestHandler<Empty, APIResponse<Dog[]>, Empty, Pagination> = (req, res) => {
  // your implementation
};

const getDog: RequestHandler<BaseParams, APIResponse<Dog | null>, Empty, Empty> = (req, res) => {
  // your implementation
};

const createDog: RequestHandler<Empty, APIResponse<Dog>, DogDetails, Empty> = (req, res) => {
  // your implementation
};

const updateDog: RequestHandler<BaseParams, APIResponse<Dog>, Partial<DogDetails>, Empty> = (req, res) => {
  // your implementation
};

const deleteDog: RequestHandler<BaseParams, APIResponse<Dog>, Empty, Empty> = (req, res) => {
  // your implementation
};

app.get('/api/v1/dogs', getDogs);
app.get('/api/v1/dogs/:id', getDog);
app.post('/api/v1/dogs/:id', createDog);
app.put('/api/v1/dogs/:id', updateDog);
app.delete('/api/v1/dogs/:id', deleteDog);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});

export type DogApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/api/v1/dogs': {
      get: { summary: "Get all dogs", handler: typeof getDogs },
      post: { summary: "Create a dog", handler: typeof createDog },
    },
    '/api/v1/dogs/{id}': {
      get: { summary: "Get a dog", handler: typeof getDog },
      put: { summary: "Update a dog", handler: typeof updateDog },
      delete: { summary: "Delete a dog", handler: typeof deleteDog },
    },
  },
}>;

(async () => {
  const openapiSpec = await generateTspec();
  fs.writeFileSync('openapi.json', JSON.stringify(openapiSpec, null, 2));
})();
