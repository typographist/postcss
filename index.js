import postcss from 'postcss';

export { ratios } from '@typographist/core';
const {
  transformAtrules,
  transformDecls,
  transformRules,
} = require('./transformator');

const DEFAULT_CONFIG = {
  base: '16px',
  lineHeight: 1.5,
  ratio: 1.333,
};

export const typographist = postcss.plugin(
  'typographist',
  (config = DEFAULT_CONFIG) => (root) => {
    root.walkDecls((decl) => {
      transformDecls(decl, config);
    });

    root.walkAtRules((atrule) => {
      transformAtrules(atrule, config);
    });

    root.walkRules((rule) => {
      transformRules(rule);
    });

    // Remove empty rules.
    root.walkRules((rule) => {
      if (!rule.nodes.length) rule.remove();
    });
  },
);
