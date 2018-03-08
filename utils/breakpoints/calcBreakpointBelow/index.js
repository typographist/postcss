const getNameOfNextBreakpoint = require('../getNameOfNextBreakpoint');
const getBreakpointMax = require('../getBreakpointMax');
const getNamesOfBreakpoints = require('../getNamesOfBreakpoints');
const { toEm } = require('../../../helpers');

/**
 *
 * @param {string} breakName Breakpoint name.
 * @param {array<Object>} config User configuration.
 * @return {number} value of the next breakpoint - 0.02px;
 */
module.exports = (breakName, config) => {
  const upperBreak = getNameOfNextBreakpoint(breakName);
  const breakpointsNames = getNamesOfBreakpoints(config);
  const lastName = breakpointsNames[breakpointsNames.length - 1];
  const penultimateName = breakpointsNames[breakpointsNames.length - 2];
  let result = null;

  try {
    if (upperBreak !== lastName) {
      const maxBreakVal = getBreakpointMax(breakName);
      result = `${toEm(maxBreakVal)}em`;
    }
    throw new Error(
      `
        ${breakName} is invalid value! Use ${penultimateName} as a maximum value.
      `,
    );
  } catch (err) {
    result = null;
    console.log(err.message);
  }

  return result;
};
