import { initTspecApiServer, Tspec } from "tspec";

/** 도서 정보 */
interface Book {
  /** 도서 ID */
  id: Tspec.Integer;
  /** 도서 제목 */
  title: string;
  /** 작가 정보 리스트 */
  authors: Author[];
  /** 커버 이미지 URL */
  coverImage: Tspec.ImageUrlString;
  /** 출판일 */
  publishedDate?: Tspec.DateString;
}

/** 작가 정보 */
interface Author {
  /**
   * 작가명
   * @examples "김수지"
   */
  name: string;
  /** 작가 역할 */
  role: AuthorRole;
}

/** 작가 역할 */
enum AuthorRole {
  WRITER = 'writer',
  TRANSLATOR = 'translator',
}

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

initTspecApiServer();
