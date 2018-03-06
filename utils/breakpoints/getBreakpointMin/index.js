const getBreakpointsNames = require('../getBreakpointsNames');

module.exports = (name, config) => {
  const breakpointsNames = getBreakpointsNames(config);
  const index = breakpointsNames.indexOf(name);
  return index > -1 ? breakpointsNames[index] : null;
};
