const { toEm } = require('@typographist/core');
const { decl, atRule } = require('postcss');

// fontSizeProp :: (String | Number) -> Void
exports.fontSizeProp = (size) =>
  decl({
    prop: 'font-size',
    value: size,
  });

//  mediaQuery :: String -> Object
exports.mediaQuery = (minWidth) =>
  atRule({
    name: 'media ',
    params: `(min-width: ${toEm(minWidth)})`,
  });
