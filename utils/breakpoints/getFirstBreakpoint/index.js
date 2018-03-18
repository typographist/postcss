const { FIRST_BREAKPOINT } = require('../../../constants');

/**
 * @param {Object} breakpoints Object of breakpoints.
 * @return {Object} The first breakpoint from breakpoints.
 */
module.exports = breakpoints =>
  breakpoints.find(b => FIRST_BREAKPOINT.test(b.value));
