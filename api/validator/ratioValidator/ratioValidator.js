import { CONTAINS_AT } from '../../regex';
import isNumeric from '../../helpers/isNumeric';

/**
 * Check the line for matching the specified pattern.
 * @param {string} ratio 
 */
export const isRatioContainsAt = (ratio) => {
  try {
    if (CONTAINS_AT.test(ratio)) return true;
    throw new Error(`${ratio} is incorrect value! The string must have a 
    positive or negative integer or a floating-point number in units of px or em,
    a space, a word at, a space, 
    a positive or negative floating point number without units of measure.`);
  } catch (err) {
    console.log(err.message);
    return false;
  }
};


/**
 * Validation ratio
 * @param {any} ratio
 * @return {boolean} 
 */
export const isValidRatio = (ratio) => {
  try {
    switch (typeof ratio) {
      case 'number':
        return isNumeric(ratio);
      case 'string':
        return isRatioContainsAt(ratio);
      default:
        throw new Error('Typeof ratio must be string or number');
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

/**
* @param {any} checkRatios
* @return {boolean}
*/
export const isValidRatios = checkRatios => (
  checkRatios.every(ratio => isValidRatio(ratio))
);

