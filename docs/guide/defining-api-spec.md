---
outline: deep
---
# Defining Open API schemas
You can easily define API specifications by passing types. To build an Open API schema, simply pass the necessary information as a generic type parameter of `Tspec.DefineApiSpec`.
<!-- The type passed should be a subset of the [OpenAPI Object](https://swagger.io/specification/v3/#openapi-object) defined in the [OpenAPI Specification](https://swagger.io/specification/v3/). -->

**Example**
```js
import { Tspec } from 'tspec';

export type apiSpec = Tspec.DefineApiSpec<{
  tags: ['author', 'home'];
  basePath: '/api/v1';
  paths: {
    '/authors/{id}': {
      get: {
        summary: 'Author information';
        path: { id: number },
        tags: ['author'];
        responses: { 
          200: {
            name: string;
          }
        }
      };
    };
    '/home': { 
      get: { 
        tags: ['home'];
        query: { id: number },
        responses: {
          200: {
            home: {
            title: string;
            items: number[];
            }
          }
       };
     };
  };
}>;
```
