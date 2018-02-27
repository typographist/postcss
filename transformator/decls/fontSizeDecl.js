const postcss = require('postcss');

module.exports = size =>
  postcss.decl({
    prop: 'font-size',
    value: size,
  });
