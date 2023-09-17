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
exports.hashPasswordHook = void 0;
const bcrypt_1 = __importDefault(require('bcrypt'));
const config_1 = __importDefault(require('../../../config'));
function hashPasswordHook(password) {
  return __awaiter(this, void 0, void 0, function* () {
    const saltRounds = Number(config_1.default.bycrypt_salt_rounds); // You need to define your salt rounds from your configuration
    return yield bcrypt_1.default.hash(password, saltRounds);
  });
}
exports.hashPasswordHook = hashPasswordHook;
