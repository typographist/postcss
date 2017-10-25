const postcss = require('postcss');

const lineHeightDecl = () => (
  postcss.decl({
    prop: 'line-height',
    value: '2rem',
  })
);

module.exports = lineHeightDecl;
