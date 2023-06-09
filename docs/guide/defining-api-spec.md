---
outline: deep
---
# Defining API Spec
You can easily define API specifications by passing types. To build an Open API schema, simply pass the necessary information as a generic type parameter of `Tspec.DefineApiSpec`.
<!-- The type passed should be a subset of the [OpenAPI Object](https://swagger.io/specification/v3/#openapi-object) defined in the [OpenAPI Specification](https://swagger.io/specification/v3/). -->

## Basic Usage

Let's define a simple `AuthorApiSpec`:

```ts{8}
import { Tspec } from 'tspec';

interface Author {
  id: number;
  name: string;
}

export type AuthorApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/authors': {
      get: {
        summary: 'List of authors',
        responses: { 
          200: Author[],
        },
      },
    },
  }
}>;
```

:::details Generated OpenAPI Spec

The paths and schemas in the generated OpenAPI Spec are described as follows:

```yaml{2}
paths:
  "/authors":
    get:
      operationId: AuthorApiSpec_get_/authors
      summary: List of authors
      responses:
        '200':
          content:
            application/json:
              schema:
                type: array
                items:
                  "$ref": "#/components/schemas/Author"
components:
  schemas:
    Author:
      type: object
      properties:
        id:
          type: number
        name:
          type: string
      additionalProperties: false
      required:
      - id
      - name
```
:::


## Parameters
### Path Parameters

You can define path parameters by using the `path` property of the operation type.

::: code-group

```ts[Tspec]{6}
export type AuthorApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/authors/{id}': {
      get: {
        summary: 'Get author by id',
        path: { id: number },
        responses: { 
          200: Author,
        },
      },
    },
  }
}>;
```
:::

:::details Generated OpenAPI Spec
```yaml{6-11}
paths:
  "/authors/{id}":
    get:
      operationId: AuthorApiSpec_get_/authors/{id}
      summary: Get author by id
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
                "$ref": "#/components/schemas/Author"
```
:::


Possible path parameter types are as follows:

- `string`
- `number`


### Query Parameters

You can define query parameters by using the `query` property of the operation type.

::: code-group
```ts[Tspec]{6-9}
export type AuthorApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/authors': {
      get: {
        summary: 'List of authors',
        query: { 
          limit: number,
          offset: number,
        },
        responses: { 
          200: Author[],
        },
      },
    },
  }
}>;
```
:::

:::details Generated OpenAPI Spec
```yaml{6-14}
paths:
  "/authors":
    get:
      operationId: AuthorApiSpec_get_/authors
      summary: List of authors
      parameters:
        - name: limit
          in: query
          schema:
            type: number
        - name: offset
          in: query
          schema:
            type: number
      responses:
        '200':
          content:
            application/json:
              schema:
                type: array
                items:
                  "$ref": "#/components/schemas/Author"
```
:::

Possible query parameter types are as follows:

- `string`
- `number`
- `boolean`
- `string[]`
- `number[]`
- `boolean[]`

### Header and Cookie Parameters

You can define header and cookie parameters by using the `header` and `cookie` properties of the operation type.

::: code-group
```ts[Tspec]{6-11}
export type AuthorApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/authors': {
      get: {
        summary: 'List of authors',
        header: { 
          'x-api-key': string,
        },
        cookie: { 
          'debug': 0 | 1,
        },
        responses: { 
          200: Author[],
        },
      },
    },
  }
}>;
```
:::

:::details Generated OpenAPI Spec
```yaml{7-18}
paths:
  "/authors":
    get:
      operationId: AuthorApiSpec_get_/authors
      summary: List of authors
      parameters:
        - name: x-api-key
          in: header
          schema:
            type: string
          required: true
        - name: debug
          in: cookie
          schema:
            enum:
              - 0
              - 1
          required: true
      responses:
        '200':
          content:
            application/json:
              schema:
                type: array
                items:
                  "$ref": "#/components/schemas/Author"
```
:::

Possible header and cookie parameter types are as follows:
- `string`
- `number`


### Request Body

You can define request body by using the `body` property of the operation type.

::: code-group
```ts[Tspec]{6}
export type AuthorApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/authors': {
      post: {
        summary: 'Create an author',
        body: Author,
        responses: { 
          201: Author,
        },
      },
    },
  }
}>;
```
:::

:::details Generated OpenAPI Spec  
```yaml{6-11}
paths:
  "/authors":
    post:
      operationId: AuthorApiSpec_post_/authors
      summary: Create an author
      requestBody:
        required: true
        content:
          application/json:
            schema:
              "$ref": "#/components/schemas/Author"
      responses:
        '201':
          content:
            application/json:
              schema:
                "$ref": "#/components/schemas/Author"
```
:::


Body parameter types can be any object type.

## Base Path

You can define the base path by using the `basePath` property of the API spec type.

::: code-group
```ts[Tspec]{2,4,12}
export type AuthorApiSpec = Tspec.DefineApiSpec<{
  basePath: '/authors',
  paths: {
    '/': {
      get: {
        summary: 'List of authors',
        responses: { 
          200: Author[],
        },
      },
    },
    '/{id}': {
      get: {
        summary: 'Get author by id',
        path: { id: number },
        responses: { 
          200: Author,
        },
      },
    },
  }
}>;
```
:::

:::details Generated OpenAPI Spec
```yaml{2,14}
paths:
  "/authors":
    get:
      operationId: AuthorApiSpec_get_/authors
      summary: List of authors
      responses:
        '200':
          content:
            application/json:
              schema:
                type: array
                items:
                  "$ref": "#/components/schemas/Author"
  "/authors/{id}":
    get:
      operationId: AuthorApiSpec_get_/authors/{id}
      summary: Get author by id
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
                "$ref": "#/components/schemas/Author"
```
:::

## Tags

You can define tags by using the `tags` property of the API spec type.

::: code-group
```ts[Tspec]{2}
export type AuthorApiSpec = Tspec.DefineApiSpec<{
  tags: ['Author'],
  paths: {
    '/authors': {
      get: {
        summary: 'List of authors',
        responses: {
          200: Author[],
        },
      },
    },
  }
}>;
```
:::

:::details Generated OpenAPI Spec
```yaml{5-6}
paths:
  "/authors":
    get:
      operationId: AuthorApiSpec_get_/authors
      tags:
        - Author
      summary: List of authors
      responses:
        '200':
          content:
            application/json:
              schema:
                type: array
                items:
                  "$ref": "#/components/schemas/Author"
```
:::

If you want to define tags for each operation, you can use the `tags` property of the operation type.

::: code-group
```ts[Tspec]{6}
export type AuthorApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/authors': {
      get: {
        summary: 'List of authors',
        tags: ['Author'],
        responses: {
          200: Author[],
        },
      },
    },
  }
}>;
```
:::

:::details Generated OpenAPI Spec
```yaml{5-6}
paths:
  "/authors":
    get:
      operationId: AuthorApiSpec_get_/authors
      tags:
        - Author
      summary: List of authors
      responses:
        '200':
          content:
            application/json:
              schema:
                type: array
                items:
                  "$ref": "#/components/schemas/Author"
```
:::
