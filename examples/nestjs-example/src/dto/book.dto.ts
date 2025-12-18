export interface Book {
  id: number;
  title: string;
  author: string;
  publishedAt: string;
}

export interface CreateBookDto {
  title: string;
  author: string;
}

export interface UpdateBookDto {
  title?: string;
  author?: string;
}

export interface BookListQuery {
  page?: number;
  limit?: number;
  search?: string;
}
