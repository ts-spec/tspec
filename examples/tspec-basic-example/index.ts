import { Tspec } from "tspec";

/** Book Schema */
interface Book {
  /** Book ID */
  id: number;
  /** Book title */
  title: string;
  /** Book description */
  description?: string;
}

export type BookApiSpec = Tspec.DefineApiSpec<{
  tags: ['Book'],
  paths: {
    '/books/{id}': {
      get: {
        summary: 'Get book by id',
        path: { id: number },
        responses: { 200: Book[] },
      },
    },
  }
}>;
