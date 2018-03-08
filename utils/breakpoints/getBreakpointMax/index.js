const getNameOfNextBreakpoint = require('../getNameOfNextBreakpoint');
const getBreakpointValue = require('../getBreakpointValue');
const getNameOfMinBreakpoint = require('../getNameOfMinBreakpoint');

// From bootstrap v4. ---------------------
// Maximum breakpoint width. Null for the largest (last) breakpoint.
// The maximum value is calculated as the minimum of the next one less 0.02px
// to work around the limitations of `min-` and `max-` prefixes and viewports with fractional widths.
// See https://www.w3.org/TR/mediaqueries-4/#mq-min-max
// Uses 0.02px rather than 0.01px to work around a current rounding bug in Safari.
// See https://bugs.webkit.org/show_bug.cgi?id=178261

/**
 *
 * @param {string} breakName Breakpoint name.
 * @param {object} config User configuration.
 * @return {number|null} The value of the next breakpoint - 0.02px, or null if it is not present.
 */
module.exports = (breakName, config) => {
  const next = getNameOfNextBreakpoint(breakName, config);
  const nextBreakValue = getBreakpointValue(
    getNameOfMinBreakpoint(next, config),
    config,
  );

  return next ? nextBreakValue - 0.02 : null;
};
