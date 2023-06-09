import { Tspec } from "tspec";

/** Schema description defined by JSDoc */
interface Book {
  /** Field description defined by JSDoc */
  id: number;
  title: string;
  description?: string;
}

export type BookApiSpec = Tspec.DefineApiSpec<{
  tags: ['Book']
  paths: {
    '/books/{id}': {
      get: {
        summary: 'Get book by id',
        path: { id: number },
        header: { 'X-Request-ID': string },
        cookie: { debug: 0 | 1 },
        responses: { 200: Book },
      },
    },
  }
}>;
