import { Tspec } from '../../../types/tspec';

/** Basic User Schema */
interface User {
  /** User ID */
  id: number;
  /** User name */
  name: string;
  /** User email */
  email?: string;
  /** Is active */
  isActive: boolean;
}

export type BasicTypesApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/users': {
      get: {
        summary: 'Get all users',
        responses: { 200: User[] },
      },
      post: {
        summary: 'Create user',
        body: Omit<User, 'id'>,
        responses: { 201: User },
      },
    },
    '/users/{id}': {
      get: {
        summary: 'Get user by id',
        path: { id: number },
        responses: { 200: User },
      },
    },
  }
}>;
