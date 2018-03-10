const { BROWSER_DEFAULT_FONT_SIZE } = require('../../constants');

/**
 * @param {string} inPx
 * @return {number}
 */
module.exports = inPx => parseFloat(inPx) / BROWSER_DEFAULT_FONT_SIZE;
