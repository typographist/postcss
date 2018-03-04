const { BROWSER_DEFAULT_FONT_SIZE } = require('../../constants');

/**
 *
 * @param {number|string} val
 * @return {number}
 */
module.exports = val => parseFloat(val) / BROWSER_DEFAULT_FONT_SIZE * 100;
