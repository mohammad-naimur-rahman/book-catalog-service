/* eslint-disable @typescript-eslint/no-explicit-any */
export const asyncForEach = async <T>(arr: Array<T>, cb: any) => {
  if (!Array.isArray(arr)) {
    throw new Error('Exprected an array!');
  }
  for (let index = 0; index < arr.length; index++) {
    await cb(arr[index], index, arr);
  }
};
