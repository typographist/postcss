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
    console.log(err.message);
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

function func(config) {
  const values = Object.values(config);
  return values.every(val => isBreakpoint(item));
}

export const isBreakpoint = (val) => {
  try {
    if (isObject(val) && val.breakpoint) {
      return true;
    }

    throw new Error('Breakpoint is required parametr!');
  } catch (err) {
    console.log(err);
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
