const { HAS_EM, HAS_PX } = require('../../../constants/regexes');
const {
  checkIsBreakpointName,
  getNamesOfBreakpoints,
} = require('../../../api/breakpoints');

module.exports = (node, lowerBreakpoint, breakpointsList) => {
  node.remove();
  throw new Error(
    `
    \`${lowerBreakpoint}\` is incorrect first parameter of @t-between. Use \`${breakpointsList}\` or the value in pixels or in ems.
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
