const { omit } = require('lodash');

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

module.exports = removeKey;
