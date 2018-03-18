const { decamelize } = require('humps');

/**
 *
 * @param {Array<string>} namesOfBreakpoints An array containing the names of breakpoints in the camel case of notation
 * @return {string} A string containing the names of breakpoints in the cebab-case notation.
 *
 */
module.exports = namesOfBreakpoints =>
  namesOfBreakpoints.map(b => decamelize(b, { separator: '-' })).join(', ');
