const { BROWSER_DEFAULT_FONT_SIZE } = require('../../constants');

/**
 *
 * @param {number|string} val
 * @return {number}
 */
const percentage = val => val / BROWSER_DEFAULT_FONT_SIZE * 100;

module.exports = percentage;
