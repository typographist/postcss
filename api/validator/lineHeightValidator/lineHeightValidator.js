// import isNumber from '../../helpers/isNumber/isNumber';
import isNumeric from '../../helpers/isNumeric/';

/**
 * Check whether all the values of the number?
 * @param {array<any>} lineHeights
 * @return {boolean}
 */

const isValidLineHeights = lineHeights => (
  lineHeights.every(lineHeight => isNumeric(lineHeight))
);

export default isValidLineHeights;

