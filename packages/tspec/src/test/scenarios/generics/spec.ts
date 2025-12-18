import { Tspec } from '../../../types/tspec';

/** Pagination wrapper */
interface PaginatedResponse<T> {
  /** Items in current page */
  items: T[];
  /** Total count */
  total: number;
  /** Current page */
  page: number;
  /** Items per page */
  pageSize: number;
  /** Has next page */
  hasNext: boolean;
}

/** Product schema */
interface Product {
  /** Product ID */
  id: number;
  /** Product name */
  name: string;
  /** Product price */
  price: number;
}

/** Category schema */
interface Category {
  /** Category ID */
  id: number;
  /** Category name */
  name: string;
  /** Category description */
  description?: string;
}

export type GenericsApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/products': {
      get: {
        summary: 'Get paginated products',
        query: {
          page?: number,
          pageSize?: number,
        },
        responses: { 200: PaginatedResponse<Product> },
      },
    },
    '/categories': {
      get: {
        summary: 'Get paginated categories',
        query: {
          page?: number,
          pageSize?: number,
        },
        responses: { 200: PaginatedResponse<Category> },
      },
    },
  }
}>;
