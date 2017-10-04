import { omit } from 'lodash';

/**
 * @param {string} key 
 * @param {array<object>} breakpoints 
 * @return {array<object>} - without the specified key
 */
const removeKey = (key, breakpoints) => (
  breakpoints.map(breakpoint => (
    omit(breakpoint, key)
  ))
);

export default removeKey;
