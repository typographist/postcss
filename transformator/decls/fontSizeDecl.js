const postcss = require('postcss');

/**
 * @param {string|number} size Font size value.
 * @return {void}
 */
module.exports = (size) =>
  postcss.decl({
    prop: 'font-size',
    value: size,
  });
