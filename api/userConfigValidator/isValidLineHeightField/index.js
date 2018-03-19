const { isNumeric } = require('../../../helpers');

/**
 * Check lineHeights number or not.
 * @param {Array<any>} lineHeights Array of lineHeights
 * @return {boolean} Number or not.
 */

module.exports = lineHeights =>
  lineHeights.every(lineHeight => isNumeric(lineHeight));
