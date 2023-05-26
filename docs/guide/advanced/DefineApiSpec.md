---
outline: deep
---
# Defining Open API schemas
You can easily define API specifications by passing types. To build an Open API schema, simply pass the necessary information as a generic type parameter of `Tspec.DefineApiSpec`. The type passed should be a subset of the [OpenAPI Object](https://swagger.io/specification/v3/#openapi-object) defined in the [OpenAPI Specification](https://swagger.io/specification/v3/).

**Example**
```js
import { Tspec } from 'tspec';

export type apiSpec = Tspec.DefineApiSpec<{
  tags: ['author', 'home'];
  basePath: '/';
  servers: [{ url: '/' }];
  securityDefinitions: {
    cookieAuth: {
      name: 'cookie';
      in: Headers;
    };
  };
  paths: {
    '/authors/{id}': {
      get: {
        summary: 'Author information';
        path: { id: number },
        tags: ['author'];
        responses: { 200: {
          name: string;
         }
        }
      };
    };
    '/home': { 
      get: { 
        tags: ['home'];
        query: { id: number },
        responses: { 200: {
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


## Defining Express API 
If you are using the Express framework, you can pass the type of `RequestHandler` directly to the handler using `typeof <RequestHandler>`. Tspec will generate an [Operation Object](https://swagger.io/specification/v3/#operation-object) for the corresponding path.

**Example**
::: info
Generated open API schema in the following example is equivalent to that of the former example.
:::


*RequestHandler implementation*
```js 
// authorController.ts
interface Response {
  name: number; 
}

interface PathParameter {
  id: number;
}

export const get: RequestHandler<PathParameter, Response> = async (
  req,
  res,
) => {
 ...
};

```
```js 
// homeController.ts
interface Home {
  title: string;
  items: number[];
}

interface Response {
  home: Home; 
}

interface Query {
  id: number;
}

export const get: RequestHandler<never, Response, never, Query> = async (
  req,
  res,
) => {
 ...
};

```
*Defining API Spec*

```js{22,28}
import { Tspec } from 'tspec';

import * as author from 'authorController'
import * as home from 'homeController'

export type apiSpec = Tspec.DefineApiSpec<{
  tags: ['author', 'home'];
  basePath: '/';
  servers: [{ url: '/' }];
  securityDefinitions: {
    cookieAuth: {
      name: 'cookie';
      in: Headers;
    };
  };
  paths: {
    '/authors/{id}': {
      get: {
        summary: 'Author information';
        description: 'name';
        tags: ['author'];
        handler: typeof author.get;
      };
    };
    '/home': { 
      get: { 
        tags: ['home'];
        handler: typeof home.get 
       };
     };
  };
}>;
```