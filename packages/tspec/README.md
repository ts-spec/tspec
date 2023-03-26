# tspec
OpenAPI Specification Generator from TypeScript Types


## Why tspec?
- **Code First**: Rely on TypeScript type and JSDoc to generate OpenAPI Specification.
- **Easy to learn**: No need to learn new OpenAPI Spec syntax. Just use TypeScript types.
- **Easy to use**: Only few lines of code are needed to generate OpenAPI Specification.
- **Flexible**: You can use any framework you want. (currently only support [Express](https://expressjs.com/))


## How to use?
### 1. Define API Specification
```ts
import { Tspec } from 'tspec'
import { getPetById } from './controller';

export type PetApiSpec = Tspec.DefineApiSpec<{
  specs: {
    '/pet/{id}': {
      get: { summary: 'Find pet by ID', handler: typeof getPetById },
    },
  },
}>;
```

**Express Code Example**
```ts
// controller.ts
import { Request, Response } from 'express';

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

const getPetById = async (req: Request<PetParams>, res: Response<Pet>) => {
  const { id } = req.params;
  res.json({ id, name: 'dog' });
}
```


### 2. Generate OpenAPI Spec
Tspec automatically parses ApiSpec types and generates OpenAPI Specification 3.0.

```ts
const openAPISpec = await generateSpec();
// {
//   openapi: '3.0.0',
//   info: { title: 'API', version: '1.0.0' },
//   paths: {
//     '/pet/{id}': {
//       get: {
//         summary: 'Find pet by ID',
//         parameters: [
//           {
//             name: 'id',
//             in: 'path',
//             required: true,
//             description: 'pet id',
//             schema: {
//               type: 'string',
//               example: '1234'
//             }
//         ]
//         responses: {
//           '200': {
//             description: 'OK',
//             content: {
//               'application/json': {
//                 schema: {
//                   type: 'object',
//                   properties: {
//                     id: {
//                       type: 'string',
//                       example: '1234'
//                     },
//                     name: {
//                       type: 'string',
//                       example: 'dog'
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
```
