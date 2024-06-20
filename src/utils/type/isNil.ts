/**
 * check is the value is 'null' or 'undefined'
 * @param value the value to check
 * @returns { boolean} 'true' if the value is 'null' or 'undefined', 'false' otherwise
 */
export const isNil = (value: unknown): boolean => value === null || value === undefined;
