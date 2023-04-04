import express, { Request, Response } from 'express';
import { Tspec, initTspecServer } from "tspec";

interface Book {
  id: number;
  title: string;
}

type QueryParam = {
  /** 검색어 */
  q?: string;
};

const getBookById = (
  req: Request<never, any, never, QueryParam>,
  res: Response<Book[]>,
) => {
  res.json([{
    id: 1,
    title: req.query.q || '',
  }]);
}

export type BookApiSpec = Tspec.DefineApiSpec<{
  security: 'JWT',
  paths: {
    '/books': {
      get: { summary: '도서 검색', handler: typeof getBookById },
    }
  }
}>;

const app = express();
app.get('/books', getBookById);

app.listen(3000, () => {
  console.log('Express server started on http://localhost:3000')
});

initTspecServer({
  port: 4000,
  proxyHost: 'http://localhost:3000',
  openapi: {
    securityDefinitions: {
      JWT: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  outputPath: 'src/openapi.json'
});
