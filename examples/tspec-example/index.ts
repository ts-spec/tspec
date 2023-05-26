import express, { Request, Response, Router } from "express";
import { Tspec, TspecDocsMiddleware } from "tspec";

/** 도서 정보 */
interface Book {
  /** 도서 ID */
  id: number;
  /**
   * 도서명
   * @example 상수리 나무 아래
   * */
  title: string;
  tags: Tag[];
}

/** 태그 정보 */
type Tag = '로맨스' | '판타지';

const getBookById = (req: Request<{ id: string }>, res: Response<Book>) => {
  res.json({
    id: +req.params.id,
    title: '상수리 나무 아래',
    tags: ['로맨스', '판타지'],
  })
}
const router = Router().get('/books/:id', getBookById);

export type BookApiSpec = Tspec.DefineApiSpec<{
  tags: ['도서'],
  paths: {
    '/books/{id}': {
      get: { summary: '단일 도서 조회', handler: typeof getBookById },
    },
  }
}>;

const initServer = async () => {
  const app = express();
  app.use(router);
  app.use('/docs', await TspecDocsMiddleware());
  app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`);
  });
}
initServer();
