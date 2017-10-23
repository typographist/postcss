const postcss = require('postcss');

const fontSizeDecl = (size, func) => {
  let result = null;
  if (!func) {
    result = postcss.decl({
      prop: 'font-size',
      value: size,
    });
  } else {
    result = postcss.decl({
      prop: 'font-size',
      value: func(size),
    });
  }

  return result;
};

module.exports = fontSizeDecl;

