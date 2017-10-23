const postcss = require('postcss');

const toCababCase = string => (
  string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
);

const variableDecl = ({ name, value }) => (
  postcss.decl({
    prop: `--${toCababCase(name)}`,
    value,
  })
);

module.exports = variableDecl;
