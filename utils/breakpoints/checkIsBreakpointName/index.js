/**
 * Check if this name is specified in the config file?
 *
 * @param {array<String>} namesOfBreakpoints An array containing the names of breakpoints.
 * @param {string} breakName Breakpoint name.
 * @return {boolean}
 */
module.exports = (namesOfBreakpoints, breakName) =>
  namesOfBreakpoints.some(item => item === breakName);
