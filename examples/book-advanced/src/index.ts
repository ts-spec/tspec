import { Tspec, initTspecServer } from "tspec";

/** 도서 정보 */
interface Book {
  /** 도서 ID */
  id: Tspec.Integer;
  /** 도서 제목 */
  title: string;
  /** 태그 리스트 */
  tags: Tag[];
  /** 출판일 */
  publishedDate?: Tspec.DateString;
}

/** 태그 정보 */
type Tag = '로맨스' | '판타지' | '스릴러';

export type BookApiSpec = Tspec.DefineApiSpec<{
  tags: ['도서'],
  basePath: '/books',
  paths: {
    '/':  {
      get: {
        summary: '도서 검색',
        query: {
          /** 검색어 */
          q: string;
        },
        responses: { 200: Book[] },
      },
    },
    '/{id}': {
      patch: {
        summary: '도서 수정',
        path: { id: Tspec.Integer },
        body: Omit<Book, 'id'>,
        responses: { 200: Book },
      },
    },
  }
}>;

initTspecServer({ outputPath: 'src/openapi.json', port: 3000 });
