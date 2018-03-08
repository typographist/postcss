const getBreakpointValue = require('../getBreakpointValue');
const { toEm } = require('../../../helpers');

/**
 *
 * @param {string} breakName Breakpoint name.
 * @param {object} config User configuration.
 * @return {string} value of the breakpoint convert to em.
 */
module.exports = (breakName, config) => {
  const breakValue = getBreakpointValue(breakName, config);

  return `${toEm(breakValue)}em`;
};
