const postcss = require('postcss');
const toEm = require('../../helpers/toEm');

module.exports = ({ minWidth, nestedRule }) => {
  const mediaWidth = toEm(minWidth);
  const atrule = postcss.atRule({
    name: 'media ',
    params: `screen and (min-width: ${mediaWidth}em)`,
  });
  atrule.append(nestedRule);

  return atrule;
};
