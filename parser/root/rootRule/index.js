const postcss = require('postcss');
const fontSizeDecl = require('../../decls/fontSizeDecl');
const persentage = require('../../../helpers/persentage');

const rootRule = (fontSize) => {
  const root = postcss.rule({
    selector: ':root',
  });

  const rootSize = `${persentage(fontSize)}%`;
  root.append(fontSizeDecl(rootSize));

  return root;
};

module.exports = rootRule;
