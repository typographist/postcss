import { CONTAINS_PX_OR_EM } from '../../constants/constants';

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
    console.log(err.message);
    return false;
  }
};


/**
 * @param {string} val
 * @return {boolean}
 */
export const isBreakpointContainsPxOrEm = (val) => {
  try {
    if (CONTAINS_PX_OR_EM.test(val)) return true;
    throw new Error(`${val} is incorrect value! Please, use pixels or em.`);
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
