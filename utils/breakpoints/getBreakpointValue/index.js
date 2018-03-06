const makeBreakpointsModel = require('../../makeBreakpointsModel');

module.exports = (name, config) => {
  const breakpoints = makeBreakpointsModel(config);
  return parseFloat(breakpoints.find(b => b.name === name).value);
};
