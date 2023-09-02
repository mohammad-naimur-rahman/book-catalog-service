"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = require("express");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const book_controller_1 = require("./book.controller");
const book_validation_1 = require("./book.validation");
const router = (0, express_1.Router)();
router.get('/', book_controller_1.BookController.getAllBooks);
router.post('/create-book', (0, validateRequest_1.default)(book_validation_1.BookValidation.createBookZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BookController.createBook);
router
    .route('/:id')
    .get(book_controller_1.BookController.getSingleBook)
    .patch((0, validateRequest_1.default)(book_validation_1.BookValidation.updateCategoryZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BookController.updateBook)
    .delete((0, validateRequest_1.default)(book_validation_1.BookValidation.deleteBookZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BookController.deleteBook);
router.get('/:categoryId/category', book_controller_1.BookController.getBookByCategory);
exports.BookRoutes = router;
