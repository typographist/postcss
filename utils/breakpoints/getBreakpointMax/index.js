const getNameOfNextBreakpoint = require('../getNameOfNextBreakpoint');
const getBreakpointValue = require('../getBreakpointValue');
const getNameOfMinBreakpoint = require('../getNameOfMinBreakpoint');

module.exports = (name, config) => {
  const next = getNameOfNextBreakpoint(name, config);

  return next
    ? getBreakpointValue(getNameOfMinBreakpoint(next), config) - 0.02
    : null;
};
