const postcss = require('postcss');
const BROWSER_DEFAULT_FONT_SIZE = require('../../_api/constants').BROWSER_DEFAULT_FONT_SIZE;

/**
 * @param {string} inPx
 * @return {number}
 */
const toEm = inPx => (
  parseFloat(inPx) / BROWSER_DEFAULT_FONT_SIZE
);


const mediaDecl = ({ minWidth, fontSize, nestedRule }) => {
  const mediaWidth = toEm(minWidth);
  const rule = postcss.atRule({
    name: 'media',
    params: `(min-width: ${mediaWidth}em)`,
  });
  rule.append(nestedRule);

  return rule;
};

module.exports = mediaDecl;
