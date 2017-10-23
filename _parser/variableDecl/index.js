const postcss = require('postcss');
const toCebabCase = require('../../_api/helpers/toCebabCase');

const variableDecl = ({ name, value }) => (
  postcss.decl({
    prop: `--${toCebabCase(name)}`,
    value,
  })
);

module.exports = variableDecl;
