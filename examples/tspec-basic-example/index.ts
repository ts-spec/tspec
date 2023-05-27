import { Tspec } from "tspec";

/** Schema description defined by JSDoc */
interface Book {
  /** Field description defined by JSDoc */
  id: number;
  title: string;
  description?: string;
}

export type BookApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/books/{id}': {
      get: {
        summary: 'Get book by id',
        path: { id: number },
        responses: { 200: Book },
      },
    },
  }
}>;
