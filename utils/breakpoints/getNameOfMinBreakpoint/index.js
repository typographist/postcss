const getNamesOfBreakpoints = require('../getNamesOfBreakpoints');

/**
 *
 * @param {string} breakName Breakpoint name.
 * @param {object} config User configuration.
 * @return {string|null}  The breakpoint name, if present in the user configuration or null.
 */
module.exports = (breakName, config) => {
  const namesOfBreakpoints = getNamesOfBreakpoints(config);
  const index = namesOfBreakpoints.indexOf(breakName);
  return index > -1 ? namesOfBreakpoints[index] : null;
};
