/**
 * Returns a new object containing only the specified properties from the input object.
 *
 * @param {Record<string, unknown>} obj - The input object.
 * @param {k[]} keys - An array of keys to pick from the input object.
 * @return {Partial<T>} - A new object with only the specified properties.
 */
const pick = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T,
  keys: k[]
): Partial<T> => {
  const finalObj: Partial<T> = {};

  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};

export default pick;
