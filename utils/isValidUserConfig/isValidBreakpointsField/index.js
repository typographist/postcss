const { isObject } = require('../../../helpers');
const { HAS_PX_OR_EM } = require('../../../constants/regexes');

/**
 * Check breakpoint is string or not.
 * @param {any} breakpoint Breakpoint value from user configuration.
 * @return {boolean} String or not.
 */
const breakpointIsString = breakpoint => {
  let result = null;

  try {
    if (typeof breakpoint === 'string') {
      result = true;
    } else {
      result = false;
      throw new Error('Is incorrect breakpint! Breakpoint must be a string');
    }
  } catch (err) {
    console.warn(err.message);
  }

  return result;
};

/**
 * Check base has px or em.
 * @param {string} breakpoint Breakpoint from user configuration.
 * @return {boolean} Has or not.
 */
const breakpointHasPxOrEm = breakpoint => {
  let result = null;

  try {
    if (HAS_PX_OR_EM.test(breakpoint)) {
      result = true;
    } else {
      result = false;
      throw new Error(
        `${breakpoint} is incorrect value! Please, use pixels or em.`,
      );
    }
  } catch (err) {
    console.warn(err.message);
  }

  return result;
};

/**
 * @param {Object} config User configuration.
 * @return {Array<Object>} Array of breakpoints objects.
 */
const getBreakpoints = config =>
  Object.values(config).filter(item => isObject(item));

/**
 * Checking for a key named breakpoint in a breakpoint object.
 * @param {Object} breakpoint Object of breakpoint from user configuration.
 * @return {boolean} Is there or not.
 */
const breakpointHasBreakpointKey = objectOfBreakpoint => {
  let result = null;

  try {
    if (objectOfBreakpoint.breakpoint) {
      result = true;
    } else {
      result = false;
      throw new Error('Breakpoint is required key!');
    }
  } catch (err) {
    console.warn(err.message);
  }

  return result;
};

/**
 * @param {Array<any>} breakpoints
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
