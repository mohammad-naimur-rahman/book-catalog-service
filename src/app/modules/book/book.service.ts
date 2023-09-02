import { Book } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createBook = async (payload: Book): Promise<Book> => {
  const book = await prisma.book.create({
    data: payload,
  });
  return book;
};

// const getAllBooks = async (query: string): Promise<Book[]> => {
//   const books = await prisma.book.findMany({
//     include: {
//       category: true,
//       reviewAndRatings: true,
//     },
//   });
//   return books;
// };

const getAllBooks = async (req: Request): Promise<null> => {
  const url = new URL(req.url);
  const queries = url.searchParams;
  console.log(queries);
  // const {
  //   page = 1,
  //   size = 10,
  //   sortBy = 'createdAt',
  //   sortOrder = 'desc',
  //   minPrice,
  //   maxPrice,
  //   category,
  //   search,
  // } = query;
  // // Define Prisma query filters based on the query parameters
  // const filters: Prisma.BookWhereInput = {};
  // // Pagination
  // const skip = (page - 1) * size;
  // const take = size;
  // // Sorting
  // const orderBy: Prisma.BookOrderByInput = {};
  // orderBy[sortBy] = sortOrder;
  // // Filtering
  // if (minPrice !== undefined) {
  //   filters.price = { gte: parseFloat(minPrice) };
  // }
  // if (maxPrice !== undefined) {
  //   filters.price = { ...filters.price, lte: parseFloat(maxPrice) };
  // }
  // if (category !== undefined) {
  //   filters.categoryId = category;
  // }
  // if (search !== undefined) {
  //   filters.OR = [
  //     { title: { contains: search, mode: 'insensitive' } },
  //     { author: { contains: search, mode: 'insensitive' } },
  //     { genre: { contains: search, mode: 'insensitive' } },
  //   ];
  // }
  // const books = await prisma.book.findMany({
  //   where: filters,
  //   include: {
  //     category: true,
  //     reviewAndRatings: true,
  //   },
  //   skip,
  //   take,
  //   orderBy,
  // });
  // return books;
  return null;
};

const getBookByCategory = async (id: string): Promise<Book[]> => {
  const books = await prisma.book.findMany({
    where: {
      categoryId: id,
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
