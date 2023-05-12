---
outline: deep
---
# Defining Open API schemas
 Pass information needed to build Open API spec as a generic type of `Tspec.DefineApiSpec`.

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
    '/authors': {
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
You can pass the type of `RequestHandler` directly using `typeof <RequestHandler>` to handler.

**Example**
Following example is equivalent to the former example. 

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

```js
import { Tspec } from 'tspec';

import * as author from './authorController'
import * as home from './homeController'

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
    '/authors': {
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