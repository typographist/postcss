/**
 * Chech for a number
 * @param {any} num 
 * @return {boolean}
 */
const isNumeric = num => !isNaN(parseFloat(num)) && isFinite(num);

export default isNumeric;
