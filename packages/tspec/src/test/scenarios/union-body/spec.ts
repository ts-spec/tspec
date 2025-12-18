import { Tspec } from '../../../types/tspec';

type PoemRequest = {
  type: 'poem';
  verses: number;
};

type NovelRequest = {
  type: 'novel';
  chapters: number;
};

type BookRequest = PoemRequest | NovelRequest;

interface Book {
  id: number;
  title: string;
}

export type UnionBodyApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/books': {
      post: {
        summary: 'Create a book';
        body: BookRequest;
        responses: { 201: Book };
      };
    };
  };
}>;
