---
outline: deep
---

# Express Integration
If you are using the Express framework, you can pass the type of `RequestHandler` directly to the handler using `typeof <RequestHandler>`. Tspec will generate an [Operation Object](https://swagger.io/specification/v3/#operation-object) for the corresponding path.

**Example**
::: info
Generated open API schema in the following example is equivalent to that of the former example.
:::


*RequestHandler implementation*

::: code-group
```ts[authorController.ts]
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
:::

::: code-group
```ts[homeController.ts]
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
:::

*Defining API Spec*

::: code-group
```ts[apiSpec.ts]{13,19}
import { Tspec } from 'tspec';

import * as author from './authorController'
import * as home from './homeController'

export type apiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/authors/{id}': {
      get: {
        summary: 'Author information',
        description: 'name',
        tags: ['author'],
        handler: typeof author.get,
      },
    },
    '/home': {
      get: {
        tags: ['home'],
        handler: typeof home.get,
       },
     },
  },
}>;
```
:::

*Generated Open API Schema*

::: code-group
```yaml[openapi.yaml]
info:
  title: Tspec API
  version: 0.0.1
openapi: 3.0.3
paths:
  "/authors/{id}":
    get:
      operationId: apiSpec_get_/authors/{id}
      tags:
      - author
      summary: Author information
      parameters:
      - name: id
        in: query
        required: true
        schema:
          type: number
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  home:
                    "$ref": "#/components/schemas/Home"
                additionalProperties: false
                required:
                - home
  "/home":
    get:
      operationId: apiSpec_get_/home
      tags:
      - home
      parameters:
      - name: id
        in: path
        required: true
        schema:
          type: number
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  name:
                    type: number
                additionalProperties: false
                required:
                - name
components:
  schemas:
    Home:
      type: object
      properties:
        title:
          type: string
        items:
          type: array
          items:
            type: number
      additionalProperties: false
      required:
      - items
      - title
    Query:
      type: object
      properties:
        id:
          type: number
      additionalProperties: false
      required:
      - id
    RequestHandler_never__home_Home___never_Query_Record_string_any__:
      type: object
      additionalProperties: false
    PathParameter:
      type: object
      properties:
        id:
          type: number
      additionalProperties: false
      required:
      - id
    RequestHandler_PathParameter__name_number___any_qs.ParsedQs_Record_string_any__:
      type: object
      additionalProperties: false
```
:::

