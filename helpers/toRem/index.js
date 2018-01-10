const getBase = require('../getBase');

/**
 * @param {number} baseSize
 * @param {number} rootSize
 * @return {string}
 */
const toRem = (baseSize, rootSize) => getBase(baseSize) / rootSize;

module.exports = toRem;
