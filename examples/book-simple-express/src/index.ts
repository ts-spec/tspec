import { Tspec, initTspecServer } from "tspec";
import express, { Request, Response } from 'express';

/** 도서 정보 */
interface Book {
  /** 도서 ID */
  id: Tspec.Integer;
  /** 도서 제목 */
  title: string; 
  /** 커버 이미지 URL */
  cover: string;
}

const getBookById = (
  req: Request<{ id: string }>, res: Response<Book>,
) => {
  res.json({
    id: +req.params.id,
    title: '상수리 나무 아래',
    cover: 'https://img.ridicdn.net/cover/4766000064',
  });
}

const app = express();
app.get('/books/:id', getBookById);
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
});

export type BookApiSpec = Tspec.DefineApiSpec<{
  tags: ['도서'],
  paths: {
    '/books/{id}': {
      get: { summary: '단일 도서 조회', handler: typeof getBookById },
    }
  }
}>;

initTspecServer({ port: 4000, proxyHost: 'http://localhost:3000',outputPath: 'src/openapi.json'});
