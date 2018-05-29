const { HAS_PX_OR_EM } = require('../../../constants/regexes');

/**
 * Check base is string or not.
 * @param {any} base base
 * @return {boolean} String or not.
 */
const isBaseString = base => {
  let result = null;

  try {
    if (typeof base === 'string') {
      result = true;
    } else {
      result = false;
      throw new Error('Base value must be a string or array of strings.');
    }
  } catch (err) {
    console.warn(err.message);
  }

  return result;
};

/**
 * Case has pixels or em.
 * @param {string} base Base from user configuration.
 * @return {boolean} has or not.
 */
const baseHasPxOrEm = base => {
  let result = null;
  try {
    if (HAS_PX_OR_EM.test(base)) {
      result = true;
    } else {
      result = false;
      throw new Error(`${base} is incorrect value! Please, use pixels or em.`);
    }
  } catch (err) {
    console.warn(err.message);
  }

  return result;
};

/**
 * Checking the array of bases to match all specified conditions.
 * @param {array<any>} checkBases - Flat array or bases.
 * @param {function} fn Function specifying check condition.
 * @return {boolean} Valid or not.
 */
const isValidBases = (checkBases, fn) => checkBases.every(base => fn(base));

module.exports = {
  isBaseString,
  baseHasPxOrEm,
  isValidBases,
};
