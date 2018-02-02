/**
 * Chech for a number
 * @param {any} num
 * @return {boolean}
 */
const isNumeric = num => !Number.isNaN(parseFloat(num)) && isFinite(num);

module.exports = isNumeric;
