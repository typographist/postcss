const isNumeric = require('../../helpers/isNumeric/');

/**
 * Check whether all the values of the number?
 * @param {array<any>} lineHeights
 * @return {boolean}
 */

const isValidLineHeights = lineHeights => (
  lineHeights.every(lineHeight => isNumeric(lineHeight))
);

module.exports = isValidLineHeights;

