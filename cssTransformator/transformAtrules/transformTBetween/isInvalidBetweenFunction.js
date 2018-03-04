const { HAS_EM, HAS_PX } = require('../../../constants/regexes');
const { checkIsBreakpointName } = require('../../helpers');

module.exports = (node, lowerBreakpoint, breakpointsList) => {
  node.remove();
  throw new Error(
    `
    ${lowerBreakpoint} is invalid first argument in @t-between function!
    Use ${breakpointsList} or the value in pixels or in ems.
    `,
  );
};

module.exports.test = (lowerBreakpoint, breakpointsNames) =>
  [
    !checkIsBreakpointName(breakpointsNames, lowerBreakpoint),
    !HAS_PX.test(lowerBreakpoint),
    !HAS_EM.test(lowerBreakpoint),
  ].every(Boolean);
