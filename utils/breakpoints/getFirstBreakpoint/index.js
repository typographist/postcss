const { FIRST_BREAKPOINT } = require('../../../constants');

/**
 * @param {Array<Object>} breakpoints Array of breakpoints.
 * @return {Object} The first breakpoint from breakpoints.
 */
module.exports = breakpoints =>
  breakpoints.find(b => FIRST_BREAKPOINT.test(b.value));
