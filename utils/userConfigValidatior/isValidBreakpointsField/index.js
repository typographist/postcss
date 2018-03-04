const { isObject } = require('../../../helpers');
const { HAS_PX_OR_EM } = require('../../../constants/regexes');

/**
 * @param {any} breakpoint
 * @return {boolean}
 */
const breakpointIsString = breakpoint => {
  try {
    switch (typeof breakpoint) {
      case 'string':
        return true;
      default:
        throw new Error('Is incorrect breakpint! Breakpoint must be a string');
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

/**
 * @param {string} breakpoint
 * @return {boolean}
 */
const breakpointHasPxOrEm = breakpoint => {
  try {
    if (HAS_PX_OR_EM.test(breakpoint)) {
      return true;
    }

    throw new Error(
      `${breakpoint} is incorrect value! Please, use pixels or em.`,
    );
  } catch (err) {
    console.log(err);
    return false;
  }
};

/**
 * @param {object} config
 * @return {array<object>}
 */
const getBreakpoints = config =>
  Object.values(config).filter(item => isObject(item));

/**
 * @param {object} breakpoint
 * @return {boolean}
 */
const breakpointHasBreakpointKey = breakpoint => {
  try {
    if (breakpoint.breakpoint) return true;
    throw new Error('Breakpoint is required key!');
  } catch (err) {
    console.log(err);
    return false;
  }
};

/**
 * @param {array<any>} breakpoints
 * @param {function} fn
 * @return {boolean}
 */
const isValidBreakpointsField = (breakpoints, fn) =>
  breakpoints.every(breakpoint => fn(breakpoint));

module.exports = {
  breakpointIsString,
  breakpointHasPxOrEm,
  getBreakpoints,
  breakpointHasBreakpointKey,
  isValidBreakpointsField,
};
