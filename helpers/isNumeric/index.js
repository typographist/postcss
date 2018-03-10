/**
 * Check for a number
 * @param {any} num
 * @return {boolean}
 */

/* eslint-disable no-restricted-globals */
module.exports = num => !Number.isNaN(parseFloat(num)) && isFinite(num);
/* eslint-enable */
