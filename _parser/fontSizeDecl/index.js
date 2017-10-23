const postcss = require('postcss');
const breakpoints = calculate(config);

const fontSizeDecl = size => (
  postcss.decl({
    prop: 'font-size',
    value: size,
  })
);

module.exports = fontSizeDecl;
