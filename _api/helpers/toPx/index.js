const BROWSER_DEFAULT_FONT_SIZE = require('../../constants').BROWSER_DEFAULT_FONT_SIZE;

/**
 * @param {string} ems
 * @return {number}   
 */
const toPx = ems => (
  parseFloat(ems) * BROWSER_DEFAULT_FONT_SIZE
);

module.exports = toPx;
