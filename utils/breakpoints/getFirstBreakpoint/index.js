const { FIRST_BREAKPOINT } = require('../../../constants');

module.exports = breakpoints =>
  breakpoints.find(b => FIRST_BREAKPOINT.test(b.value));
