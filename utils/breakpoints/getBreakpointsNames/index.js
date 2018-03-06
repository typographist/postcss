const makeBreakpointsModel = require('../../makeBreakpointsModel');

module.exports = config => {
  const breakpoints = makeBreakpointsModel(config);

  return breakpoints
    .filter(b => b.name !== 'default')
    .map(breakpoint => breakpoint.name);
};
