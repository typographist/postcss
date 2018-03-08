const getNamesOfBreakpoints = require('../getNamesOfBreakpoints');

/**
 *
 * @param {string} breakName Breakpoint name.
 * @param {object} config User configuration.
 * @return {string|null}  The breakpoint name, if present in the user configuration or null.
 */
module.exports = (breakName, config) => {
  const breakpointsNames = getNamesOfBreakpoints(config);
  const index = breakpointsNames.indexOf(breakName);
  return index > -1 ? breakpointsNames[index] : null;
};
