const { decamelize } = require('humps');

/**
 *
 * @param {Array<string>} breakpointsNames
 * @returns {string} A string containing the names of breakpoints in the cebab-case notation.
 *
 */
module.exports = breakpointsNames =>
  breakpointsNames.map(b => decamelize(b, { separator: '-' })).join(', ');
