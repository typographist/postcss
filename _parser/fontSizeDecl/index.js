const postcss = require('postcss');

const fontSizeDecl = size => (
  postcss.decl({
    prop: 'font-size',
    value: size,
  })
);

module.exports = fontSizeDecl;
