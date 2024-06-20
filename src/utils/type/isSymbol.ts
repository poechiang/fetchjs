/**
 * check if 'value' is classified as a 'symbol' primitive or object
 * @param {*} value the value to check
 * @returns {bool} true if value is a symbol, false otherwise
 * @example
 * isSymbol(Symbol.iterator)
 * // => true
 *
 * isSymbol('abc')
 * // => false
 */
export const isSymbol = (value: unknown): boolean => {
  const type = typeof value;
  return type === 'symbol' || (type === 'object' && value !== null && value?.constructor?.name === 'Symbol');
};
