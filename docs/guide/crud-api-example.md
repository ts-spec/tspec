# CRUD Example

Let's define a CRUD API spec for `Author`:

::: code-group

```ts[Tspec]
import { Tspec } from 'tspec';

interface Author {
  id: number;
  name: string;
}

export type AuthorApiSpec = Tspec.DefineApiSpec<{
  basePath: '/authors',
  tags: ['Author'],
  paths: {
    '/': {
      get: {
        summary: 'List of authors',
        responses: { 
          200: Author[],
        },
      },
      post: {
        summary: 'Create an author',
        requestBody: Author,
        responses: { 
          201: Author,
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
      put: {
        summary: 'Update an author',
        path: { id: number },
        requestBody: Author,
        responses: { 
          200: Author,
        },
      },
      delete: {
        summary: 'Delete an author',
        path: { id: number },
        responses: { 
          204: void,
        },
      },
    },
  }
}>;
```

```yaml[OpenAPI]
paths:
  "/authors/":
    get:
      operationId: AuthorApiSpec_get_/
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
    post:
      operationId: AuthorApiSpec_post_/
      tags:
      - Author
      summary: Create an author
      responses:
        '201':
          content:
            application/json:
              schema:
                "$ref": "#/components/schemas/Author"
  "/authors/{id}":
    get:
      operationId: AuthorApiSpec_get_/{id}
      tags:
      - Author
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
    put:
      operationId: AuthorApiSpec_put_/{id}
      tags:
      - Author
      summary: Update an author
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
    delete:
      operationId: AuthorApiSpec_delete_/{id}
      tags:
      - Author
      summary: Delete an author
      parameters:
      - name: id
        in: path
        required: true
        schema:
          type: number
      responses:
        '204':
          content:
            application/json:
              schema:
                type: undefined
```
:::

The generated Swagger UI looks like this:

![CRUD Example](/assets/images/crud-swagger-ui.png)
