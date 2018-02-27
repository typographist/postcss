/**
 * Check for a number
 * @param {any} num
 * @return {boolean}
 */

/* eslint-disable no-restricted-globals */
const isNumeric = num => !Number.isNaN(parseFloat(num)) && isFinite(num);
/* eslint-enable */

module.exports = isNumeric;
