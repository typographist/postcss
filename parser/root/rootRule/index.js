const postcss = require('postcss');
const persentage = require('../../../helpers/persentage');
const fontSizeDecl = require('../../decls/fontSizeDecl');

const rootRule = fontSize => {
  const root = postcss.rule({
    selector: ':root',
  });

  const rootSize = `${persentage(fontSize)}%`;
  root.append(fontSizeDecl(rootSize));

  return root;
};

module.exports = rootRule;
