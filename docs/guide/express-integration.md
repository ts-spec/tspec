---
outline: deep
---

# Express Integration

If you are using the [Express framework](https://expressjs.com/), you can integrate Tspec into your project easily.
Tspec automatically parses your [Express](https://expressjs.com/) handler type to generate parameters and responses schemas and provides middleware to serve Swagger UI.

## Setup Express Application

Before integrating Tspec, assume that you have the following Express controller:

::: code-group
```ts[controller.ts]
import { Request, Response } from 'express';

type PathParams = { id: string };
type AuthorRes = { id: string, name: string };

export const getAuthor = async (
  req: Request<PathParams>,
  res: Response<AuthorRes>,
) => {
  res.json({
    id: req.params.id,
    name: 'Author Name',
  });
};
```
:::


:::tip
The controller type can be written in a more concise way using `Express.RequestHandler` type:

::: code-group
```ts[controller.ts]{3,5}
import { RequestHandler } from 'express';

type GetAuthor = RequestHandler<PathParams, AuthorRes>;

export const getAuthor: GetAuthor = async (req, res) => {
  res.json({
    id: req.params.id,
    name: 'Author Name',
  });
};
```
:::

## Defining API Spec

Now, let's define the API spec in using `Tspec.DefineApiSpec` type.

::: code-group
```ts[index.ts]{10}
import { Tspec } from 'tspec';

import * as controller from './controller'

export type ApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/authors/{id}': {
      get: {
        summary: 'Get author by id',
        handler: typeof controller.getAuthor,
      },
    },
  },
}>;
```
:::

You can pass the controllers type to the `handler` property of the spec to generate parameters(`path`, `query`, `body`) and responses schemas automatically.



## Serving API Document

Tspec provides `TspecDocsMiddleware` to serve Swagger UI.

Let's add the middleware to your Express server:

::: code-group
```ts[index.ts]{2,20}
import express from 'express';
import { Tspec, TspecDocsMiddleware } from 'tspec';

import * as controller from './controller'

export type ApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/authors/{id}': {
      get: {
        summary: 'Get author by id',
        handler: typeof controller.getAuthor,
      },
    },
  },
}>;

const initServer = async () => {
  const app = express()
  app.get('/authors/:id', controller.getAuthor);
  app.use('/docs', await TspecDocsMiddleware());
  app.listen(3000);
}
initServer();
```
:::

<!-- ::: details Options

You can pass the following options to `TspecDocsMiddleware`:

::: -->

Then, you can access Swagger UI at `http://localhost:3000/docs`


