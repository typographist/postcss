const postcss = require('postcss');
const { fontSizeDecl } = require('../../decls');
const { toRem } = require('../../../helpers');

const bodyRule = (baseSize, rootSize) => {
  const body = postcss.rule({
    selector: 'body',
  });
  const base = `${toRem(baseSize, rootSize)}rem`;
  body.append(fontSizeDecl(base));

  return body;
};

module.exports = bodyRule;
