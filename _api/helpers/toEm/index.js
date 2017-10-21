const BROWSER_DEFAULT_FONT_SIZE = require('../../constants').BROWSER_DEFAULT_FONT_SIZE;

/**
 * @param {string} val 
 * @return {number}
 */
const toEm = px => (
  parseFloat(px) / BROWSER_DEFAULT_FONT_SIZE
);

module.exports = toEm;
