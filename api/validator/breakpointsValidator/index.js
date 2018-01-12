const { isObject } = require('../../../helpers');
const { CONTAINS_PX_OR_EM } = require('../../../regex');

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
const isBreakpointContainsPxOrEm = breakpoint => {
  try {
    if (CONTAINS_PX_OR_EM.test(breakpoint)) {
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
const checkContainsBreakpointKey = breakpoint => {
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
const isValidBreakpoints = (breakpoints, fn) =>
  breakpoints.every(breakpoint => fn(breakpoint));

module.exports = {
  breakpointIsString,
  isBreakpointContainsPxOrEm,
  getBreakpoints,
  checkContainsBreakpointKey,
  isValidBreakpoints,
};
