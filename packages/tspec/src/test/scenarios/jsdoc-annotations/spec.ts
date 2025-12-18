import { Tspec } from '../../../types/tspec';

/**
 * User profile with JSDoc annotations
 * @example { "id": 1, "username": "john_doe", "age": 25 }
 */
interface UserProfile {
  /**
   * User ID
   * @minimum 1
   */
  id: number;
  /**
   * Username
   * @minLength 3
   * @maxLength 20
   * @pattern ^[a-zA-Z0-9_]+$
   */
  username: string;
  /**
   * User age
   * @minimum 0
   * @maximum 150
   */
  age?: number;
  /**
   * User email
   * @format email
   */
  email: string;
  /**
   * User website
   * @format uri
   */
  website?: string;
  /**
   * @deprecated Use 'username' instead
   */
  name?: string;
}

export type JsDocAnnotationsApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/profiles': {
      get: {
        summary: 'Get all profiles',
        responses: { 200: UserProfile[] },
      },
      post: {
        summary: 'Create profile',
        body: Omit<UserProfile, 'id'>,
        responses: { 201: UserProfile },
      },
    },
  }
}>;
