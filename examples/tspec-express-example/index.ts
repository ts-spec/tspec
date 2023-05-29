import express, { Request, Response, Router } from "express";
import { Tspec, TspecDocsMiddleware } from "tspec";

/** Book Schema */
interface Book {
  /** Book ID */
  id: number;
  /**
   * Book Title
   * @example Under the Oak Tree
   * */
  title: string;
  tags: Tag[];
}

/** Tag Schema */
type Tag = 'Romance' | 'Fantasy';

const getBookById = (req: Request<{ id: string }>, res: Response<Book>) => {
  res.json({
    id: +req.params.id,
    title: 'Under the Oak Tree',
    tags: ['Romance', 'Fantasy'],
  })
}
const router = Router().get('/books/:id', getBookById);

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
  app.use(router);
  app.use('/docs', await TspecDocsMiddleware());
  app.listen(3000, () => {
    console.log(`Tspec docs is running on http://localhost:3000/docs`);
  });
}
initServer();
