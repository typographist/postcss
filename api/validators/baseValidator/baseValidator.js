import { CONTAINS_PX_OR_EM } from '../../regex/regex';

/**
 * @param {any} checkBase
 * @return {boolean} 
 */
export const isBaseString = (checkBase) => {
  try {
    switch (typeof checkBase) {
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
 * @param {string} checkBase 
 * @return {boolean} 
 */
export const isBaseContainPxOrEm = (checkBase) => {
  try {
    switch (CONTAINS_PX_OR_EM.test(checkBase)) {
      case true:
        return true;
      default:
        throw new Error(`${checkBase} is incorrect value! Please, use pixels or em.`);
    }
  } catch (err) {
    console.log(err.message);
    return false;
  }
};


/**
 * @param {array<any>} checkBases - flat array
 * @param {function} fn
 * @return {boolean} 
 */
export const isValidBases = (checkBases, fn) => (
  checkBases.every(base => fn(base))
);
