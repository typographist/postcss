const postcss = require('postcss');
const {
  transformAtrules,
  transformMsUnit,
  transformNestedRules,
} = require('./transformator');
const ratios = require('./constants/ratios');

const defaultConfig = {
  base: '16px',
  lineHeight: 1.5,
  ratio: 1.333,
};

module.exports = postcss.plugin(
  'typographist',
  (config = defaultConfig) => root => {
    root.walkDecls(decl => {
      if (transformMsUnit.test(decl)) {
        transformMsUnit(decl, config);
      }
    });

    root.walkAtRules(atrule => {
      transformAtrules(atrule, config);
    });

    root.walkRules(rule => {
      if (transformNestedRules.test(rule)) {
        transformNestedRules(rule);
      }
    });

    // Remove empty rules.
    root.walkRules(rule => {
      if (!rule.nodes.length) rule.remove();
    });
  },
);
