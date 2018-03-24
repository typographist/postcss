const { camelize } = require('../../../helpers');
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
  const namesOfBreakpoints = getNamesOfBreakpoints(config);
  const lowerBreakValue = getBreakpointValue(camelizeLower, config);
  const lastBreakName = namesOfBreakpoints[namesOfBreakpoints.length - 1];
  let result;
  try {
    if (camelizeUpper !== lastBreakName) {
      const upperBreakValue = getBreakpointMax(camelizeUpper, config);
      result = [`${toEm(lowerBreakValue)}em`, `${toEm(upperBreakValue)}em`];
    } else {
      result = `${toEm(lowerBreakValue)}em`;
    }
  } catch (err) {
    console.warn(err.message);
  }
  return result;
};
