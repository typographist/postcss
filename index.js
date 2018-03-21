const postcss = require('postcss');
const {
  transformAtrules,
  transformDecls,
  transformNestedRule,
} = require('./transformator');
const ratios = require('./constants/ratios');

const defaultConfig = {
  base: '16px',
  lineHeight: 1.5,
  ratio: 1.333,
};

const typographist = postcss.plugin(
  'typographist',
  (config = defaultConfig) => root => {
    root.walkDecls(decl => {
      transformDecls(decl, config);
    });

    root.walkAtRules(atrule => {
      transformAtrules(atrule, config);
    });

    root.walkRules(rule => {
      if (transformNestedRule.test(rule)) {
        transformNestedRule(rule);
      }
    });

    // Remove empty rules.
    root.walkRules(rule => {
      if (!rule.nodes.length) rule.remove();
    });
  },
);

module.exports = {
  typographist,
  ratios,
};
