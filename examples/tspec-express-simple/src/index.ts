import express, { Request, Response } from 'express';
import { Tspec, generateTspec } from 'tspec';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './openapi.json';

const app = express();

type PathParams = {
  bookId: string;
}

interface Book {
  id: string;
  title: string;
  description?: string;
  authors: string[];
  publishedAt: string;
}

const getBook = (req: Request<PathParams>, res: Response<Book>) => {
  res.json({
    id: req.params.bookId,
    title: 'The Great Gatsby',
    authors: ['F. Scott Fitzgerald'],
    publishedAt: '1925-04-10',
  });
};

app.get('/api/v1/books/:id', getBook);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});

export type BookApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/api/v1/books/{bookId}': {
      get: { summary: 'Get a book', handler: typeof getBook },
    },
  },
}>;

(async () => {
  const openapiSpec = await generateTspec();
  fs.writeFileSync('src/openapi.json', JSON.stringify(openapiSpec, null, 2));
})();

