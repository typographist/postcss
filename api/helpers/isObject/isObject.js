/**
 *  Whether the parametr is an object?
 *  @param {any} val
 *  @return {boolean}
 */

const isObject = val => (
  Object.prototype.toString.call(val).slice(8, -1) === 'Object'
);

export default isObject;

