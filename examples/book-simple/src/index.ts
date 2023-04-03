import { initTspecApiServer, Tspec } from "tspec";

/** 도서 정보 */
interface Book {
  /** 도서 ID */
  id: number;
  /** 도서 제목 */
  title: string;
  /** 커버 이미지 URL */
  coverImage: string;
}

export type BookApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/books/{id}': {
      get: {
        summary: '단일 도서 조회',
        path: { id: number },
        responses: { 200: Book },
      }
    }
  }
}>;

initTspecApiServer({ outputPath: 'src/openapi.json' });
