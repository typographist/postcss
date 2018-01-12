const postcss = require('postcss');
const { percentage } = require('../../../helpers');
const fontSizeDecl = require('../../decls/fontSizeDecl');

const rootRule = fontSize => {
  const root = postcss.rule({
    selector: ':root',
  });

  const rootSize = `${percentage(fontSize)}%`;
  root.append(fontSizeDecl(rootSize));

  return root;
};

module.exports = rootRule;
