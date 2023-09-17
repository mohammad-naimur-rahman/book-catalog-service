'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
/**
 * Returns a new object containing only the specified properties from the input object.
 *
 * @param {Record<string, unknown>} obj - The input object.
 * @param {k[]} keys - An array of keys to pick from the input object.
 * @return {Partial<T>} - A new object with only the specified properties.
 */
const pick = (obj, keys) => {
  const finalObj = {};
  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};
exports.default = pick;
