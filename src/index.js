import postcss from 'postcss';
import { DEFAULT_CONFIG } from './constants';

export { ratios } from '@typographist/core';

const {
  transformAtrules,
  transformDecls,
  transformRules,
} = require('./transformator');

const walkOnDecls = (root, config) =>
  root.walkDecls((decl) => {
    transformDecls(decl, config);
  });

const walkOnAtrules = (root, config) =>
  root.walkAtRules((atrule) => {
    transformAtrules(atrule, config);
  });

const walkOnRules = (root) =>
  root.walkRules((rule) => {
    transformRules(rule);
  });

const removeEmptyRules = (root) =>
  root.walkRules((rule) => {
    if (!rule.nodes.length) rule.remove();
  });

export const typographist = postcss.plugin(
  'typographist',
  (config = DEFAULT_CONFIG) => (root) => {
    walkOnDecls(root, config);

    walkOnAtrules(root, config);

    walkOnRules(root);

    removeEmptyRules(root);
  },
);
