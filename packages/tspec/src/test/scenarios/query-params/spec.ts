import { Tspec } from '../../../types/tspec';

/** Search result */
interface SearchResult {
  /** Result ID */
  id: number;
  /** Result title */
  title: string;
  /** Result score */
  score: number;
}

export type QueryParamsApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/search': {
      get: {
        summary: 'Search with various query params',
        query: {
          /** Search keyword */
          q: string,
          /** Page number */
          page?: number,
          /** Items per page */
          limit?: number,
          /** Sort by field */
          sortBy?: 'title' | 'score' | 'date',
          /** Sort order */
          order?: 'asc' | 'desc',
          /** Filter by tags */
          tags?: string[],
          /** Include archived */
          includeArchived?: boolean,
        },
        responses: { 200: SearchResult[] },
      },
    },
  }
}>;
