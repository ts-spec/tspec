import { Tspec, initTspecServer } from "tspec";

/** Book Schema */
interface Book {
  /** Book ID */
  id: Tspec.Integer;
  /** Book Title */
  title: string;
  /** Tag List */
  tags: Tag[];
  /** Published Date */
  publishedDate?: Tspec.DateString;
}

/** Tag Schema */
type Tag = 'Romance' | 'Fantasy' | 'Adventure';

export type BookApiSpec = Tspec.DefineApiSpec<{
  tags: ['Book'],
  basePath: '/books',
  paths: {
    '/':  {
      get: {
        operationId: 'searchBooks',
        summary: 'Search Books',
        description: 'Search books by keyword',
        query: {
          /**
           * Search keyword
           * @allowEmptyValue
           * @allowReserved
           * */
          q: string;
        },
        responses: { 200: Book[] },
      },
    },
    '/{id}': {
      patch: {
        operationId: 'updateBook',
        summary: 'Update Book',
        path: { id: Tspec.Integer },
        body: Omit<Book, 'id'>,
        responses: { 200: Book },
      },
      delete: {
        operationId: 'deleteBook',
        summary: 'Delete Book',
        path: { id: Tspec.Integer },
        responses: { 204: Tspec.NoContent },
      },
    },
  }
}>;

initTspecServer({ outputPath: 'src/openapi.json', port: 3000 });
