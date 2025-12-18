import { Tspec } from '../../../types/tspec';

interface Task {
  id: number;
  title: string;
}

interface ErrorResponse {
  code: string;
  message: string;
}

export type ResponseDescriptionApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/tasks/{id}': {
      delete: {
        summary: 'Delete a task';
        path: { id: number };
        responses: {
          /** Task deleted successfully */
          204: Tspec.NoContent;
          /** Invalid parameters provided */
          400: ErrorResponse;
          /** Task not found */
          404: ErrorResponse;
        };
      };
    };
  };
}>;
