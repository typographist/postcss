import { CONTAINS_PX_OR_EM } from '../../regex';
import isObject from '../../helpers/isObject';

/**
 * @param {any} breakpoint 
 * @return {boolean}
 */
export const breakpointIsString = (breakpoint) => {
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
export const isBreakpointContainsPxOrEm = (breakpoint) => {
  try {
    if (CONTAINS_PX_OR_EM.test(breakpoint)) {
      return true;
    }

    throw new Error(`${breakpoint} is incorrect value! Please, use pixels or em.`);
  } catch (err) {
    console.log(err);
    return false;
  }
};


/**
 * @param {object} config
 * @return {array<object>}
 */
export const getBreakpoints = config => (
  Object.values(config).filter(item => isObject(item))
);


/**
 * @param {object} breakpoint
 * @return {boolean}
 */
export const checkContainsBreakpointKey = (breakpoint) => {
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
export const isValidBreakpoints = (breakpoints, fn) => (
  breakpoints.every(breakpoint => fn(breakpoint))
);
