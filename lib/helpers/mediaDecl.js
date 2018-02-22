const postcss = require('postcss');
const toEm = require('../../../helpers/toEm');

const mediaDecl = ({ minWidth, nestedRule }) => {
  const mediaWidth = toEm(minWidth);
  const rule = postcss.atRule({
    name: 'media screen and',
    params: `(min-width: ${mediaWidth}em)`,
  });
  rule.append(nestedRule);

  return rule;
};

module.exports = mediaDecl;
