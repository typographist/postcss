/**
 *  Whether the parametr is an object?
 *  @param {any} val
 *  @return {boolean}
 */

module.exports = val =>
  Object.prototype.toString.call(val).slice(8, -1) === 'Object';
