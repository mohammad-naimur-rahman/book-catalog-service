'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const book_constants_1 = require('./book.constants');
const createBook = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.create({
      data: payload,
    });
    return book;
  });
const getAllBooks = req =>
  __awaiter(void 0, void 0, void 0, function* () {
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
        OR: book_constants_1.bookSearchableFileds.map(field => ({
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
    const where = conditions.length > 0 ? { AND: conditions } : {};
    const books = yield prisma_1.default.book.findMany({
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
    const total = yield prisma_1.default.book.count();
    return {
      data: books,
      meta: {
        page,
        size: take,
        total,
        totalPage: Math.ceil(total / take),
      },
    };
  });
const getBookByCategory = categoryId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const books = yield prisma_1.default.book.findMany({
      where: {
        categoryId,
      },
      include: {
        category: true,
        reviewAndRatings: true,
      },
    });
    return books;
  });
const getSingleBook = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        reviewAndRatings: true,
      },
    });
    if (!book) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Book not found'
      );
    }
    return book;
  });
const updateBook = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.findUnique({
      where: {
        id,
      },
    });
    if (!book) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Book not found'
      );
    }
    const updatedBook = yield prisma_1.default.book.update({
      where: {
        id,
      },
      data: payload,
    });
    return updatedBook;
  });
const deleteBook = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.findUnique({
      where: {
        id,
      },
    });
    if (!book) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Book not found'
      );
    }
    yield prisma_1.default.book.delete({
      where: {
        id,
      },
    });
    return book;
  });
exports.BookService = {
  createBook,
  getAllBooks,
  getBookByCategory,
  getSingleBook,
  updateBook,
  deleteBook,
};
