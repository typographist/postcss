const { rule, decl } = require('postcss');
const { toKebabCase } = require('../../utils');

// makeRootProp :: Object -> Object
exports.makeRootProp = ({ selector }) =>
  rule({
    selector,
  });

// cssVariable :: (String, String) -> Object
exports.cssVariable = (name, value) =>
  decl({
    prop: `--${toKebabCase(name)}`,
    value,
  });
