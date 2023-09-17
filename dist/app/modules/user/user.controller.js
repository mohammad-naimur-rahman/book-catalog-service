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
exports.UserController = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require('http-status'));
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const user_service_1 = require('./user.service');
const getAllUsers = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_service_1.UserService.getAllUsers();
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      data: users,
      message: 'Users retrieved successfully!',
    });
  })
);
const getUserById = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.UserService.getUserById(req.params.id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      data: user,
      message: 'User retrieved successfully!',
    });
  })
);
const getUserProfile = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.UserService.getUserProfile(req.user);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      data: user,
      message: 'User retrieved successfully!',
    });
  })
);
const updateUser = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const {
      body,
      params: { id },
    } = req;
    const user = yield user_service_1.UserService.updateUser(id, body);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      data: user,
      message: 'User updated successfully!',
    });
  })
);
const deleteUser = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.UserService.deleteUser(req.params.id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      data: user,
      message: 'User deleted successfully!',
    });
  })
);
const makeAdmin = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.UserService.makeAdmin(req.params.id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      data: user,
      message: 'User assigned role as admin successfully!',
    });
  })
);
exports.UserController = {
  getAllUsers,
  getUserById,
  getUserProfile,
  updateUser,
  deleteUser,
  makeAdmin,
};
