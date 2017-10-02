import isObject from '../../helpers/isObject';

/**
 * @param {object} config
 * @return {boolean}
 */
export const getBreakpointsName = config => (
  Object.keys(config).filter(key => (
    [
      key !== 'base',
      key !== 'lineHeight',
      key !== 'ratio',
    ].every(Boolean)
  ))
);


/**
 * @param {function} breakpoints 
 * @param {function} breakpointsName 
 * @return {object}
 */
export const setBreakpointsName = (breakpoints, breakpointsName) => (
  breakpoints.map((breakpoint, i) => (
    {
      ...breakpoint,
      name: breakpointsName[i],
    }
  ))
);

/**
 * @param {object} config
 * @return {object}
 */
export const getBreakpoints = config => (
  Object.values(config).filter(val => (
    isObject(val) && val.breakpoint
  ))
);

