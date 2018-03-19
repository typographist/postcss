const getNamesOfBreakpoints = require('../getNamesOfBreakpoints');

/**
 *
 * @param {string} breakName Breakpoint name.
 * @param {object} config User configuration.
 * @return {string|null} The name of the next breakpoint or null in its absence.
 */
module.exports = (breakName, config) => {
  const namesOfBreakpoints = getNamesOfBreakpoints(config);
  const index = namesOfBreakpoints.indexOf(breakName);

  return index < namesOfBreakpoints.length - 1
    ? namesOfBreakpoints[index + 1]
    : null;
};
