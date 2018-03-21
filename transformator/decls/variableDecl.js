const postcss = require('postcss');
const { decamelize } = require('humps');

/**
 *
 * @param {string} name Css property name.
 * @param {string|number} value Css property value.
 * @return {void}
 */
module.exports = ({ name, value }) =>
  postcss.decl({
    prop: `--${decamelize(name, { separator: '-' })}`,
    value,
  });
