const getBase = require('../getBase');

/**
 * @param {number} baseSize
 * @param {number} rootSize
 * @return {string}
 */
module.exports = (baseSize, rootSize) => getBase(baseSize) / rootSize;
