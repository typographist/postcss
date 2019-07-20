const { rule, decl } = require('postcss');
const { toKebabCase } = require('../../utils');

// rootProp :: () -> Object
exports.rootProp = () =>
  rule({
    selector: ':root',
  });

// cssVariable :: (String, String) -> Object
exports.cssVariable = (name, value) =>
  decl({
    prop: `--${toKebabCase(name)}`,
    value,
  });
