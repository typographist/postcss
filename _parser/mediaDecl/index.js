const postcss = require('postcss');

const mediaDecl = ({ minWidth, fontSize, nestedRule }) => {
  const rule = postcss.atRule({
    name: 'media',
    params: `(min-width: ${minWidth})`,
  });
  rule.append(nestedRule);

  return rule;
};

module.exports = mediaDecl;
