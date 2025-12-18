import { Tspec } from '../../../types/tspec';

/** Article schema */
interface Article {
  /** Article ID */
  id: number;
  /** Article title */
  title: string;
  /** Article content */
  content: string;
  /** Author ID */
  authorId: number;
}

export type ArticleApiSpec = Tspec.DefineApiSpec<{
  tags: ['Article'],
  security: 'bearerAuth',
  basePath: '/articles',
  paths: {
    '/': {
      get: {
        summary: 'Get all articles',
        description: 'Retrieve a list of all articles',
        security: '', // No security for this endpoint
        responses: { 200: Article[] },
      },
      post: {
        summary: 'Create article',
        description: 'Create a new article (requires authentication)',
        body: Omit<Article, 'id'>,
        responses: { 201: Article },
      },
    },
    '/{id}': {
      get: {
        summary: 'Get article by id',
        path: { id: number },
        security: '', // No security for this endpoint
        responses: { 200: Article },
      },
      put: {
        summary: 'Update article',
        tags: ['Admin'],
        path: { id: number },
        body: Omit<Article, 'id'>,
        responses: { 200: Article },
      },
      delete: {
        summary: 'Delete article',
        tags: ['Admin'],
        path: { id: number },
        responses: { 204: Tspec.NoContent },
      },
    },
  }
}>;
