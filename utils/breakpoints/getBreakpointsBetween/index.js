const { camelize, decamelize } = require('humps');
const getBreakpointValue = require('../getBreakpointValue');
const getBreakpointMax = require('../getBreakpointMax');
const getNamesOfBreakpoints = require('../getNamesOfBreakpoints');
const { toEm } = require('../../../helpers');

/**
 * The function takes the names of breakpoints in the camel-case notation. Valid are all breakpoints specified in the user configuration except the last one.
 * @param {string} lowerBreakName The name of the lower breakpoint in the camel-case notation.
 * @param {string} upperBreakName The name of the upper breakpoint in the camel-case notation.
 * @param {Object} config User configuration.
 * @return {Array<string>|null} Array of values of the lower and upper breakpoints convert to em, or null
 */
module.exports = (lowerBreakName, upperBreakName, config) => {
  const camelizeLower = camelize(lowerBreakName);
  const camelizeUpper = camelize(upperBreakName);
  const lowerBreak = getBreakpointValue(camelizeLower, config);
  const namesOfBreakpoints = getNamesOfBreakpoints(config);
  const lastBreakName = namesOfBreakpoints[namesOfBreakpoints.length - 1];
  const penultimateName = namesOfBreakpoints[namesOfBreakpoints.length - 2];
  const decamelizePenultimateName = decamelize(penultimateName, {
    separator: '-',
  });
  let result;

  try {
    if (camelizeUpper !== lastBreakName) {
      const upperBreak = getBreakpointMax(camelizeUpper, config);
      result = [`${toEm(lowerBreak)}em`, `${toEm(upperBreak)}em`];
    } else {
      result = null;
      throw new Error(
        `
        ${upperBreakName} is incorrect value! Use ${decamelizePenultimateName} as a maximum breakpoint in @t-between function.
        `,
      );
    }
  } catch (err) {
    console.log(err.message);
  }

  return result;
};
