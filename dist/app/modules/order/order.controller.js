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
exports.OrderController = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require('http-status'));
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const order_service_1 = require('./order.service');
const createOrder = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_service_1.OrderService.createOrder(
      req.body,
      req.user
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.CREATED,
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  })
);
const getAllORders = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_service_1.OrderService.getOrders(req.user);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.CREATED,
      success: true,
      message: 'Order retrieved successfully',
      data: orders,
    });
  })
);
const getSingleOrder = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_service_1.OrderService.getSingleOrder(
      req.params.id,
      req.user
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Order retrieved successfully',
      data: orders,
    });
  })
);
exports.OrderController = {
  createOrder,
  getAllORders,
  getSingleOrder,
};
