const { HAS_EM, HAS_PX } = require('../../../constants/regexes');
const { checkIsBreakpointName } = require('../../../utils/breakpoints');
const { getNamesOfBreakpoints } = require('../../../utils/breakpoints');

module.exports = (node, lowerBreakpoint, breakpointsList) => {
  node.remove();
  throw new Error(
    `
    ${lowerBreakpoint} is invalid first parameter in @t-between!
    Use ${breakpointsList} or the value in pixels or in ems.
    `,
  );
};

module.exports.test = (lowerBreakpoint, config) => {
  const namesOfBreakpoints = getNamesOfBreakpoints(config);

  return [
    !checkIsBreakpointName(namesOfBreakpoints, lowerBreakpoint),
    !HAS_PX.test(lowerBreakpoint),
    !HAS_EM.test(lowerBreakpoint),
  ].every(Boolean);
};
