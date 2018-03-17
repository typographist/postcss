const postcss = require('postcss');
const transformAtrules = require('./cssTransformator/transformAtrules');
const transformMsUnit = require('./cssTransformator/transformMsUnit');
const transformNestedRules = require('./cssTransformator/transformNestedRules');
const ratios = require('./constants/ratios');

const defaultConfig = {
  base: '16px',
  lineHeight: 1.5,
  ratio: 1.333,
};

const typographist = postcss.plugin(
  'new-typography',
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

module.exports = {
  typographist,
  ratios,
};
