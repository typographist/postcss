const postcss = require('postcss');
const fontSizeDecl = require('../fontSizeDecl');

const rootRule = (fontSize) => {
  const root = postcss.rule({
    selector: ':root',
  });
  root.append(fontSizeDecl(fontSize));

  return root;
};

module.exports = rootRule;
