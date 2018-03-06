const getBreakpointsNames = require('../getBreakpointsNames');

module.exports = (name, config) => {
  const breakpointsNames = getBreakpointsNames(config);
  const index = breakpointsNames(config).indexOf(name);

  return index < breakpointsNames.length - 1
    ? breakpointsNames[index + 1]
    : null;
};
