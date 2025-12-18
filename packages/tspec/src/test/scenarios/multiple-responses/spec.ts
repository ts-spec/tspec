import { Tspec } from '../../../types/tspec';

/** Success response */
interface SuccessResponse {
  /** Success message */
  message: string;
  /** Data payload */
  data: any;
}

/** Error response */
interface ErrorResponse {
  /** Error code */
  code: string;
  /** Error message */
  message: string;
  /** Error details */
  details?: string[];
}

/** Item schema */
interface Item {
  /** Item ID */
  id: number;
  /** Item name */
  name: string;
}

export type MultipleResponsesApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/items/{id}': {
      get: {
        summary: 'Get item by id with multiple response codes',
        path: { id: number },
        responses: {
          200: Item,
          404: ErrorResponse,
          500: ErrorResponse,
        },
      },
      delete: {
        summary: 'Delete item with multiple response codes',
        path: { id: number },
        responses: {
          204: Tspec.NoContent,
          403: ErrorResponse,
          404: ErrorResponse,
        },
      },
    },
  }
}>;
