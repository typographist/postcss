const postcss = require('postcss');
const humps = require('humps');

const variableDecl = ({ name, value }) =>
  postcss.decl({
    prop: `--${humps.decamelize(name, { separator: '-' })}`,
    value,
  });

module.exports = variableDecl;
