import { Loose } from './interface';
import { isFunction } from './type/isFunction';

export const isPropertyName = (value: string, object: Object) => {
  if (Array.isArray(value)) return false;
  const type = typeof value;
  if (type === 'string' || type === 'number' || type === 'symbol' || type === 'boolean') return true;
  return (
    /^\w*$/.test(value) ||
    !/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/.test(value) ||
    (object != null && value in Object(object))
  );
};

/**
 * create an object composed of the object properties includes in keys array or predicate returns truthy for.
 * @param object the source object
 * @param keys the property paths to pick or function to invoked pre property
 * @param predicate the function to invoked pre property
 * @returns {object} new object
 */
export const pick = <T extends Loose<any>>(
  object: T,
  keys?: (keyof T)[] | CallableFunction,
  predicate?: CallableFunction
): Partial<T> => {
  if (!object) return object;
  if (!predicate) {
    predicate = isFunction(keys) ? (keys as CallableFunction) : (value: any) => value !== null && value !== undefined;
  }

  if (!keys || !(Array.isArray(keys) && keys?.length)) {
    keys = Object.keys(object) as (keyof T)[];
  }
  return keys.reduce((obj, key) => {
    if (predicate(object[key], key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as Partial<T>);
};
