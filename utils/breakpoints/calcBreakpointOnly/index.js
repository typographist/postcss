const { camelize } = require('humps');
const getBreakpointValue = require('../getBreakpointValue');
const getBreakpointMax = require('../getBreakpointMax');
const getNamesOfBreakpoints = require('../getNamesOfBreakpoints');
const { toEm } = require('../../../helpers');

/**
 * The function takes the names of breakpoints in the camel-case notation. Valid are all breakpoints specified in the user configuration except the last one.
 * @param {string} breakName Breakpoint name.
 * @param {Object} config User configuration.
 * @return {Array<string>|string} Array of values of the lower and upper breakpoints convert to em. Rr string if if last breakpoint name in user configuration.
 */
module.exports = (breakName, config) => {
  const camelizeBreakName = camelize(breakName);
  const namesOfBreakpoints = getNamesOfBreakpoints(config);
  const lastBreakName = namesOfBreakpoints[namesOfBreakpoints.length - 1];
  let result;

  try {
    if (camelizeBreakName !== lastBreakName) {
      const lowerBreak = getBreakpointValue(camelizeBreakName, config);
      const upperBreak = getBreakpointMax(camelizeBreakName, config);
      result = [`${toEm(lowerBreak)}em`, `${toEm(upperBreak)}em`];
    } else {
      const lowerBreak = getBreakpointValue(camelizeBreakName, config);
      result = `${toEm(lowerBreak)}em`;
    }
  } catch (err) {
    console.log(err.message);
  }

  return result;
};
