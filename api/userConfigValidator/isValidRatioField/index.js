const { isNumeric } = require('../../../helpers');
const { HAS_AT } = require('../../../constants/regexes');

/**
 * The function checks if there is a word at at ration
 * @param {string} ratio Ration from user configuration.
 * @return {boolean} contained 'at' or not.
 */
const ratioHasAt = ratio => {
  let result = null;

  try {
    if (HAS_AT.test(ratio)) {
      result = true;
    } else {
      result = false;
      throw new Error(
        `
        \`${ratio}\` is incorrect value. The string must have a positive or negative integer, 
        or a floating-point number in units of px or em,a space, a word 'at', a space, 
        a positive or negative floating point number without units of measure.
        `,
      );
    }
  } catch (err) {
    console.warn(err.message);
  }
  return result;
};

/**
 * Ratio is string or number?
 * @param {any} ratio Ratio from user configuration.
 * @return {boolean} yes or not.
 */
const isValidRatio = ratio => {
  let result = null;

  try {
    if (typeof ratio === 'number') {
      result = isNumeric(ratio);
    } else if (typeof ratio === 'string') {
      result = ratioHasAt(ratio);
    } else {
      result = false;
      throw new Error('Typeof ratio must be string or number');
    }
  } catch (err) {
    console.warn(err.message);
  }

  return result;
};

/**
 * @param {array<any>} checkRatios
 * @return {boolean}
 */
const isValidRatios = checkRatios =>
  checkRatios.every(ratio => isValidRatio(ratio));

module.exports = {
  ratioHasAt,
  isValidRatio,
  isValidRatios,
};
