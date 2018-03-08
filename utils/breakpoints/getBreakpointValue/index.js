const makeBreakpointsModel = require('../../makeBreakpointsModel');

/**
 *
 * @param {string} breakName Breakpoint name.
 * @param {object} config User configuration.
 * @return {array<Number>} An array containing the values of breakpoints.
 */

module.exports = (breakName, config) => {
  const breakpoints = makeBreakpointsModel(config);

  return parseFloat(breakpoints.find(b => b.name === breakName).value);
};
