import { CONTAINS_PX_OR_EM } from '../../regex/regex';

/**
 * @param {any} val
 * @return {boolean} 
 */
export const isBaseString = (val) => {
  try {
    switch (typeof val) {
      case 'string':
        return true;
      default:
        throw new Error('Base value must be a string or Array<string>!');
    }
  } catch (err) {
    console.log(err.message);
    return false;
  }
};


/**
 * @param {string} base 
 * @return {boolean} 
 */
export const isBaseContainPxOrEm = (base) => {
  try {
    switch (CONTAINS_PX_OR_EM.test(base)) {
      case true:
        return true;
      default:
        throw new Error(`${base} is incorrect value! Please, use pixels or em.`);
    }
  } catch (err) {
    console.log(err.message);
    return false;
  }
};


/**
 * @param {array<any>} bases - flat array
 * @param {function} fn
 * @return {boolean} 
 */
export const isValidBases = (bases, fn) => (
  bases.every(base => fn(base))
);
