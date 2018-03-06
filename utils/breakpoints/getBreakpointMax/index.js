const getBreakpointNext = require('../getBreakpointNext');
const getBreakpointValue = require('../getBreakpointValue');
const getBreakpointMin = require('../getBreakpointMin');

module.exports = (name, config) => {
  const next = getBreakpointNext(name, config);

  return next
    ? getBreakpointValue(getBreakpointMin(next), config) - 0.02
    : null;
};
