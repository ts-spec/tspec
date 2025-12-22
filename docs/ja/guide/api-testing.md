# API Testing

Tspec provides a way to test your API using [Swagger UI](https://swagger.io/tools/swagger-ui/).

## Setup

Let's assume that you have the following Express application:

::: code-group
```ts[index.ts]
import express, { RequestHandler } from "express";
import { Tspec, TspecDocsMiddleware } from "tspec";

interface Book {
  id: number;
  title: string;
}

const getBookById: RequestHandler<{ id: string }, Book> = (req, res) => {
  res.json({
    id: +req.params.id,
    title: 'Under the Oak Tree',
  })
}

export type BookApiSpec = Tspec.DefineApiSpec<{
  tags: ['Book'],
  paths: {
    '/books/{id}': {
      get: {
        summary: 'Get book by id',
        handler: typeof getBookById
      },
    },
  }
}>;

const initServer = async () => {
  const app = express();
  app.get('/books/:id', getBookById);
  app.use('/docs', await TspecDocsMiddleware());
  app.listen(3000, () => {
    console.log(`Tspec docs is running on http://localhost:3000/docs`);
  });
}
initServer();
```
:::

Run the following command to start the server:

```bash
ts-node index.ts
```

Then, you can access Swagger UI at `http://localhost:3000/docs`


## Try it out

Now, you can try out the API in Swagger UI.

The `Try it out` button is located at the top right of the API section.

![try-it-out-1](/assets/images/api-test-1.png)


Click the `Try it out` button and enter the `id` parameter.

![try-it-out-2](/assets/images/api-test-2.png)

Then, click the `Execute` button to send the request.

You can see the response in the `Response body` section.

![try-it-out-3](/assets/images/api-test-3.png)
