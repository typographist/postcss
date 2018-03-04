const postcss = require('postcss');

module.exports = () =>
  postcss.decl({
    prop: 'line-height',
    value: '2rem',
  });
