const postcss = require('postcss');
const fontSizeDecl = require('../fontSizeDecl');
const rootToPersentage = require('../rootToPersentage');

const rootRule = (fontSize) => {
  const root = postcss.rule({
    selector: ':root',
  });
  root.append(fontSizeDecl(fontSize, rootToPersentage));

  return root;
};

module.exports = rootRule;
