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
exports.OrderService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const user_1 = require('../../../enums/user');
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const asyncForeach_1 = require('../../../helpers/asyncForeach');
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const createOrder = (payload, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!user.userId) {
      throw new ApiError_1.default(
        http_status_1.default.FORBIDDEN,
        'Access denied'
      );
    }
    const { orderedBooks } = payload;
    const orderWithBooks = yield prisma_1.default.$transaction(
      transactionClient =>
        __awaiter(void 0, void 0, void 0, function* () {
          const order = yield transactionClient.order.create({
            data: {
              userId: user.userId,
            },
          });
          yield (0, asyncForeach_1.asyncForEach)(orderedBooks, book =>
            __awaiter(void 0, void 0, void 0, function* () {
              yield transactionClient.orderedBook.create({
                data: {
                  orderId: order.id,
                  bookId: book.bookId,
                  quantity: +book.quantity,
                },
              });
            })
          );
          return order;
        })
    );
    const orderWithBooksIds = yield prisma_1.default.order.findUnique({
      where: {
        id: orderWithBooks.id,
      },
      include: {
        orderedBooks: true,
      },
    });
    return orderWithBooksIds;
  });
const getOrders = user =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!user.userId) {
      throw new ApiError_1.default(
        http_status_1.default.FORBIDDEN,
        'Access denied'
      );
    }
    const isAdmin = user.role === user_1.ENUM_USER_ROLE.ADMIN;
    let orders = [];
    if (isAdmin) {
      orders = yield prisma_1.default.order.findMany({
        include: {
          orderedBooks: true,
        },
      });
    } else {
      orders = yield prisma_1.default.order.findMany({
        where: {
          userId: user.userId,
        },
        include: {
          orderedBooks: true,
        },
      });
    }
    return orders;
  });
const getSingleOrder = (id, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!user.userId) {
      throw new ApiError_1.default(
        http_status_1.default.FORBIDDEN,
        'Access denied'
      );
    }
    const isAdmin = user.role === user_1.ENUM_USER_ROLE.ADMIN;
    const order = yield prisma_1.default.order.findUnique({
      where: {
        id,
      },
      include: {
        orderedBooks: true,
      },
    });
    if (!order) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Order not found'
      );
    }
    if (!isAdmin && order.userId !== user.userId) {
      throw new ApiError_1.default(
        http_status_1.default.FORBIDDEN,
        'Access denied'
      );
    }
    return order;
  });
exports.OrderService = {
  createOrder,
  getOrders,
  getSingleOrder,
};
