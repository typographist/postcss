const { makeBreakpointsModel } = require('../../makeBreakpointsModel');

/**
 *
 * @param {object} config User configuration.
 * @return {array<string>} An array containing the names of breakpoints.
 */
module.exports = config => {
  const breakpoints = makeBreakpointsModel(config);

  return breakpoints
    .filter(b => b.name !== 'default')
    .map(breakpoint => breakpoint.name);
};
