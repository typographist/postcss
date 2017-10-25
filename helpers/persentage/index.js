const BROWSER_DEFAULT_FONT_SIZE = require('../../constants').BROWSER_DEFAULT_FONT_SIZE;

/**
 * 
 * @param {number|string} val
 * @return {number}
 */
const persentage = val => (
  (val / BROWSER_DEFAULT_FONT_SIZE) * 100
);

module.exports = persentage;
