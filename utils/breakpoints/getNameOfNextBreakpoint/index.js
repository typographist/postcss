const getNamesOfBreakpoints = require('../getNamesOfBreakpoints');

/**
 *
 * @param {string} breakName Breakpoint name.
 * @param {object} config User configuration.
 * @return {string|null} The name of the next breakpoint or null.
 */
module.exports = (breakName, config) => {
  const breakpointsNames = getNamesOfBreakpoints(config);
  const index = breakpointsNames(config).indexOf(breakName);

  return index < breakpointsNames.length - 1
    ? breakpointsNames[index + 1]
    : null;
};
