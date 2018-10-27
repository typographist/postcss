const postcss = require('postcss');
const { toEm } = require('@typographist/core/helpers');

/**
 * Create a media expression and add child declarations to it.
 *
 * @param {number} minWidth Calculated font-size vlaue.
 * @param {Object} nestedRule Css rule.
 */
module.exports = ({ minWidth, nestedRule }) => {
  const mediaWidth = toEm(minWidth);
  const atrule = postcss.atRule({
    name: 'media ',
    params: `(min-width: ${mediaWidth}em)`,
  });
  atrule.append(nestedRule);

  return atrule;
};
