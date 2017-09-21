import isNumber from '../../helpers/isNumber/isNumber';

/**
 * Check whether all the values of the number?
 * @param {array<any>} lineHeights
 * @return {boolean}
 */

const isValidLineHeights = lineHeights => (
  lineHeights.every(lineHeight => isNumber(lineHeight))
);

export default isValidLineHeights;

