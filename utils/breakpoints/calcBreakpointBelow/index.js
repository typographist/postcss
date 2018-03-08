const { camelize, decamelize } = require('humps');
const getBreakpointMax = require('../getBreakpointMax');
const getNamesOfBreakpoints = require('../getNamesOfBreakpoints');
const { toEm } = require('../../../helpers');

/**
 * The function takes the names of breakpoints in the camel-case notation. Valid are all breakpoints specified in the user configuration except the last one.
 * @param {string} upperBreakName Breakpoint name.
 * @param {array<Object>} config User configuration.
 * @return {string|null} Value of the next breakpoint - 0.02px and convert to em. Or null, if the name of the last breakpoint is set.
 */
module.exports = (upperBreakName, config) => {
  const camelizeUpperBreakName = camelize(upperBreakName);
  const namesOfBreakpoints = getNamesOfBreakpoints(config);
  const lastBreakName = namesOfBreakpoints[namesOfBreakpoints.length - 1];
  const penultimateName = namesOfBreakpoints[namesOfBreakpoints.length - 2];
  const decamelizePenultimateName = decamelize(penultimateName, {
    separator: '-',
  });
  let result;

  try {
    if (camelizeUpperBreakName !== lastBreakName) {
      const maxBreakVal = getBreakpointMax(camelizeUpperBreakName, config);
      result = `${toEm(maxBreakVal)}em`;
    } else {
      result = null;
      throw new Error(`
          ${upperBreakName} is incorrect value! Use ${decamelizePenultimateName} as a maximum breakpoint in @t-below function.
        `);
    }
  } catch (err) {
    console.log(err.message);
  }

  return result;
};
