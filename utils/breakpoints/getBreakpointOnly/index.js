const getBreakpointValue = require('../getBreakpointValue');
const getBreakpointMax = require('../getBreakpointMax');

module.exports = name => {
  const lowerBreak = getBreakpointValue(name);
  const upperBreak = getBreakpointMax(name);

  return {
    lowerBreak,
    upperBreak,
  };
};
