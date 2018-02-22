const postcss = require('postcss');
const { decamelize } = require('humps');

const variableDecl = ({ name, value }) =>
  postcss.decl({
    prop: `--${decamelize(name, { separator: '-' })}`,
    value,
  });

module.exports = variableDecl;
