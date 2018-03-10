const { BROWSER_DEFAULT_FONT_SIZE } = require('../../constants');

/**
 * @param {string} inEms
 * @return {number}
 */
module.exports = inEms => parseFloat(inEms) * BROWSER_DEFAULT_FONT_SIZE;
