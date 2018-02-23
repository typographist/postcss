/**
 * Chech for a number
 * @param {any} num
 * @return {boolean}
 */
const isNumeric = num => !Number.isNaN(parseFloat(num));

module.exports = isNumeric;
