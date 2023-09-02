import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookService } from './book.service';

const getAllBooks = catchAsync(async (req, res) => {
  const book = await BookService.getAllBooks(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully!',
    data: book,
  });
});

const getBookByCategory = catchAsync(async (req, res) => {
  const books = await BookService.getBookByCategory(req.params.categoryId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully!',
    data: books,
  });
});

const createBook = catchAsync(async (req, res) => {
  const book = await BookService.createBook(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book created successfully!',
    data: book,
  });
});

const getSingleBook = catchAsync(async (req, res) => {
  const book = await BookService.getSingleBook(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully!',
    data: book,
  });
});

const updateBook = catchAsync(async (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const book = await BookService.updateBook(id, body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully!',
    data: book,
  });
});

const deleteBook = catchAsync(async (req, res) => {
  const book = await BookService.deleteBook(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully!',
    data: book,
  });
});

export const BookController = {
  getAllBooks,
  createBook,
  getBookByCategory,
  getSingleBook,
  updateBook,
  deleteBook,
};
