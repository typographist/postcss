const { makeBreakpointsModel } = require('../../makeBreakpointsModel');

/**
 *
 * @param {string} breakName Breakpoint name.
 * @param {object} config User configuration.
 * @return {number} breakpoint value.
 */

module.exports = (breakName, config) => {
  const breakpoints = makeBreakpointsModel(config);

  if (breakpoints.find(b => b.name === breakName)) {
    return parseFloat(breakpoints.find(b => b.name === breakName).value);
  }

  return null;
};
