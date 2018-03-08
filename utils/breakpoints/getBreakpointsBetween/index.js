const getBreakpointValue = require('../getBreakpointValue');
const getBreakpointMax = require('../getBreakpointMax');

module.exports = (lower, upper) => {
  const lowerBreak = getBreakpointValue(lower);
  const upperBreak = getBreakpointMax(upper);

  return {
    lowerBreak,
    upperBreak,
  };
};
