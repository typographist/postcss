const { camelize } = require('../../../helpers');
const getBreakpointValue = require('../getBreakpointValue');
const { toEm } = require('../../../helpers');

/**
 *
 * @param {string} breakName Breakpoint name.
 * @param {object} config User configuration.
 * @return {string} value of the breakpoint convert to em.
 */
module.exports = (breakName, config) => {
  const camelizeBreakName = camelize(breakName);
  const breakValue = getBreakpointValue(camelizeBreakName, config);

  return `${toEm(breakValue)}em`;
};
