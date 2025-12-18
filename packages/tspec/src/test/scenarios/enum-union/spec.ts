import { Tspec } from '../../../types/tspec';

/** Status enum using union type */
type Status = 'pending' | 'active' | 'completed' | 'cancelled';

/** Priority levels */
type Priority = 1 | 2 | 3 | 4 | 5;

/** Task with enum/union types */
interface Task {
  /** Task ID */
  id: number;
  /** Task title */
  title: string;
  /** Task status */
  status: Status;
  /** Task priority */
  priority: Priority;
  /** Optional tags */
  tags?: ('urgent' | 'important' | 'low')[];
}

export type EnumUnionApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/tasks': {
      get: {
        summary: 'Get all tasks',
        query: {
          status?: Status,
          priority?: Priority,
        },
        responses: { 200: Task[] },
      },
      post: {
        summary: 'Create task',
        body: Omit<Task, 'id'>,
        responses: { 201: Task },
      },
    },
  }
}>;
