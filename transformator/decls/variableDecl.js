const postcss = require('postcss');
const { decamelize } = require('humps');

module.exports = ({ name, value }) =>
  postcss.decl({
    prop: `--${decamelize(name, { separator: '-' })}`,
    value,
  });
