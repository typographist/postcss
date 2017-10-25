const BROWSER_DEFAULT_FONT_SIZE = require('../../constants').BROWSER_DEFAULT_FONT_SIZE;

/**
 * @param {string} inEms
 * @return {number}   
 */
const toPx = inEms => (
  parseFloat(inEms) * BROWSER_DEFAULT_FONT_SIZE
);

module.exports = toPx;
