/**
 * Check if this name is specified in the config file?
 *
 * @param {array<String>} breakpointsNames An array containing the names of breakpoints.
 * @param {string} breakName Breakpoint name.
 * @return {boolean}
 */
module.exports = (breakpointsNames, breakName) =>
  breakpointsNames.some(item => item === breakName);
