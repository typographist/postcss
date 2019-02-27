const postcss = require('postcss');

/**
 * Set css declaration line-height with value 2rem;
 * @return {void}
 */
module.exports = () =>
  postcss.decl({
    prop: 'line-height',
    value: '2rem',
  });
