// const getBreakpointValue = require('../getBreakpointValue');
// const getBreakpointMax = require('../getBreakpointMax');

// module.exports = name => {
//   const lowerBreak = getBreakpointValue(name);
//   const upperBreak = getBreakpointMax(name);

//   return [
//     lowerBreak,
//     upperBreak,
//   ];
// };

const { camelize, decamelize } = require('humps');
const getBreakpointValue = require('../getBreakpointValue');
const getBreakpointMax = require('../getBreakpointMax');
const getNamesOfBreakpoints = require('../getNamesOfBreakpoints');
const { toEm } = require('../../../helpers');

/**
 * The function takes the names of breakpoints in the camel-case notation. Valid are all breakpoints specified in the user configuration except the last one.
 * @param {string} breakName Breakpoint name.
 * @param {Object} config User configuration.
 * @return {Array<string>|null} Array of values of the lower and upper breakpoints convert to em, or null
 */
module.exports = (breakName, config) => {
  const camelizeBreakName = camelize(breakName);
  const namesOfBreakpoints = getNamesOfBreakpoints(config);
  const lastBreakName = namesOfBreakpoints[namesOfBreakpoints.length - 1];
  const penultimateName = namesOfBreakpoints[namesOfBreakpoints.length - 2];
  const decamelizePenultimateName = decamelize(penultimateName, {
    separator: '-',
  });
  let result;

  try {
    if (camelizeBreakName !== lastBreakName) {
      const lowerBreak = getBreakpointValue(camelizeBreakName, config);
      const upperBreak = getBreakpointMax(camelizeBreakName, config);
      result = [`${toEm(lowerBreak)}em`, `${toEm(upperBreak)}em`];
    } else {
      result = null;
      throw new Error(`
      ${breakName} is incorrect value! Use ${decamelizePenultimateName} as a maximum breakpoint in @-only function.
      `);
    }
  } catch (err) {
    console.log(err.message);
  }

  return result;
};
