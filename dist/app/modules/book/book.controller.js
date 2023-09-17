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
exports.BookController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const book_service_1 = require('./book.service');
const getAllBooks = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_service_1.BookService.getAllBooks(req);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Books retrieved successfully!',
      data: book,
    });
  })
);
const getBookByCategory = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_service_1.BookService.getBookByCategory(
      req.params.categoryId
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Book retrieved successfully!',
      data: books,
    });
  })
);
const createBook = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_service_1.BookService.createBook(req.body);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.CREATED,
      success: true,
      message: 'Book created successfully!',
      data: book,
    });
  })
);
const getSingleBook = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_service_1.BookService.getSingleBook(req.params.id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Book retrieved successfully!',
      data: book,
    });
  })
);
const updateBook = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const {
      body,
      params: { id },
    } = req;
    const book = yield book_service_1.BookService.updateBook(id, body);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Book updated successfully!',
      data: book,
    });
  })
);
const deleteBook = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_service_1.BookService.deleteBook(req.params.id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Book deleted successfully!',
      data: book,
    });
  })
);
exports.BookController = {
  getAllBooks,
  createBook,
  getBookByCategory,
  getSingleBook,
  updateBook,
  deleteBook,
};
