const BROWSER_DEFAULT_FONT_SIZE = require('../../_api/constants').BROWSER_DEFAULT_FONT_SIZE;

/**
 * 
 * @param {number|string} fontSize
 * @return {string}
 */
const rootToPersentage = fontSize => (
  `${(fontSize / BROWSER_DEFAULT_FONT_SIZE) * 100}%`
);

module.exports = rootToPersentage;
