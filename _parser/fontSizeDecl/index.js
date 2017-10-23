const postcss = require('postcss');
const BROWSER_DEFAULT_FONT_SIZE = require('../../_api/constants').BROWSER_DEFAULT_FONT_SIZE;

const rootToPersentage = fontSize => (
  `${(fontSize / BROWSER_DEFAULT_FONT_SIZE) * 100}%`
);

const fontSizeDecl = size => (
  postcss.decl({
    prop: 'font-size',
    value: rootToPersentage(size),
  })
);

module.exports = fontSizeDecl;
