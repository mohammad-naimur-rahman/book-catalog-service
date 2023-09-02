import { Book, Prisma } from '@prisma/client';
import { Request } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { bookSearchableFileds } from './book.constants';

const createBook = async (payload: Book): Promise<Book> => {
  const book = await prisma.book.create({
    data: payload,
  });
  return book;
};

type IBooksWithMeta = {
  data: Book[];
  meta: {
    page: number;
    size: number;
    total: number;
    totalPage: number;
  };
};

const getAllBooks = async (req: Request): Promise<IBooksWithMeta> => {
  const reqUrl = `https://example.com` + req.url.split('/')[1];
  const url = new URL(reqUrl);
  const queries = url.searchParams;

  // Pagination
  const page = Number(queries.get('page')) || 1;
  const take = Number(queries.get('size')) || 10;
  const skip = (page - 1) * take;

  // Sorting
  const sortBy = queries.get('sortBy') || 'publicationDate';
  const sortOrder = queries.get('sortOrder') || 'desc';

  // Searching and Filtering
  const conditions = [];

  // Searching
  const searchTerm = queries.get('search');
  if (searchTerm) {
    conditions.push({
      OR: bookSearchableFileds.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // Filtering
  const category = queries.get('category');
  if (category) {
    conditions.push({
      categoryId: category,
    });
  }

  // Price Filtering
  const minPrice = queries.get('minPrice');
  const maxPrice = queries.get('maxPrice');

  const minPriceNumValue = minPrice && Number(minPrice);
  const maxPriceNumValue = maxPrice && Number(maxPrice);
  if (minPriceNumValue) {
    conditions.push({
      price: {
        gte: minPriceNumValue,
      },
    });
  }
  if (maxPriceNumValue) {
    conditions.push({
      price: {
        lte: maxPriceNumValue,
      },
    });
  }

  const where: Prisma.BookWhereInput =
    conditions.length > 0 ? { AND: conditions } : {};

  const books = await prisma.book.findMany({
    include: {
      category: true,
      reviewAndRatings: true,
    },
    skip,
    take,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where,
  });

  const total = await prisma.book.count();

  return {
    data: books,
    meta: {
      page,
      size: take,
      total,
      totalPage: Math.ceil(total / take),
    },
  };
};

const getBookByCategory = async (categoryId: string): Promise<Book[]> => {
  const books = await prisma.book.findMany({
    where: {
      categoryId,
    },
    include: {
      category: true,
      reviewAndRatings: true,
    },
  });
  return books;
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const book = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      reviewAndRatings: true,
    },
  });

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  return book;
};

const updateBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book | null> => {
  const book = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  const updatedBook = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });

  return updatedBook;
};

const deleteBook = async (id: string): Promise<Book | null> => {
  const book = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  await prisma.book.delete({
    where: {
      id,
    },
  });

  return book;
};

export const BookService = {
  createBook,
  getAllBooks,
  getBookByCategory,
  getSingleBook,
  updateBook,
  deleteBook,
};
