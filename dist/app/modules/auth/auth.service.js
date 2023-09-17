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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require('bcrypt'));
const http_status_1 = __importDefault(require('http-status'));
const config_1 = __importDefault(require('../../../config'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const jwtHelpers_1 = require('../../../helpers/jwtHelpers');
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const auth_utils_1 = require('./auth.utils');
const loginUser = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield prisma_1.default.user.findUnique({
      where: { email },
    });
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'User does not exist'
      );
    }
    if (
      isUserExist.password &&
      !(yield bcrypt_1.default.compare(password, isUserExist.password))
    ) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'Password is incorrect'
      );
    }
    //create access token & refresh token
    const { id: userId, role } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(
      { userId, role },
      config_1.default.jwt.secret,
      config_1.default.jwt.expires_in
    );
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken(
      { userId, role },
      config_1.default.jwt.refresh_secret,
      config_1.default.jwt.refresh_expires_in
    );
    return {
      accessToken,
      refreshToken,
    };
  });
const signupUser = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Omiiting user role so that user can not set him / her as admin
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { password, role, email } = payload,
      userData = __rest(payload, ['password', 'role', 'email']);
    const ifUserExists = yield prisma_1.default.user.findUnique({
      where: { email },
    });
    if (ifUserExists) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'User already exists'
      );
    }
    const hashedPassword = yield (0, auth_utils_1.hashPasswordHook)(password);
    const createdUser = yield prisma_1.default.user.create({
      data: Object.assign({ password: hashedPassword, email }, userData),
    });
    return createdUser;
  });
const refreshToken = token =>
  __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
      verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(
        token,
        config_1.default.jwt.refresh_secret
      );
    } catch (err) {
      throw new ApiError_1.default(
        http_status_1.default.FORBIDDEN,
        'Invalid Refresh Token'
      );
    }
    const { userId } = verifiedToken;
    // check if user exists
    const isUserExist = yield yield prisma_1.default.user.findUnique({
      where: { id: userId },
    });
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'User does not exist'
      );
    }
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken(
      {
        id: isUserExist.id,
        role: isUserExist.role,
      },
      config_1.default.jwt.secret,
      config_1.default.jwt.expires_in
    );
    return {
      accessToken: newAccessToken,
    };
  });
exports.AuthService = {
  loginUser,
  signupUser,
  refreshToken,
};
