const { AMPERSAND } = require('@typographist/core/constants');
const cleanNode = require('../utils/clean-node');
const transformAfterNodes = require('../utils/transform-after-nodes');

module.exports = (rule) => {
  const postcssRule = rule;
  cleanNode(postcssRule);
  transformAfterNodes(postcssRule);
  postcssRule.selector = `${postcssRule.parent.selector} ${
    postcssRule.selector
  }`;
  const parent = postcssRule.parent.after(postcssRule);
  cleanNode(postcssRule);

  if (!parent.nodes.length) parent.remove();
};

module.exports.test = (rule) => {
  const { parent } = rule;
  const parentTypeIsRule = parent.type === 'rule';
  const isNotNestedRule = !AMPERSAND.test(rule.selector);
  return [parent, parentTypeIsRule, isNotNestedRule].every(Boolean);
};
