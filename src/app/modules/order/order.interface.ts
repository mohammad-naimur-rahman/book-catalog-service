import { Request } from 'express';

export type IBook = {
  bookId: string;
  quantity: number;
};

export type IOrderedBook = IBook & {
  id: string;
};

export type IOrderBody = {
  orderedBooks: IOrderedBook[];
};

export type ReqWithUser = Request & {
  user: {
    userId: string;
  };
};
