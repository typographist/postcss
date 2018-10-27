const { AMPERSAND } = require('@typographist/core/constants');
const cleanNode = require('../utils/cleanNode');
const transformAfterNodes = require('../utils/transformAfterNodes');

module.exports = rule => {
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

module.exports.test = rule => {
  const { parent } = rule;
  const parentTypeIsRule = parent.type === 'rule';
  const isNotNestedRule = !AMPERSAND.test(rule.selector);
  return [parent, parentTypeIsRule, isNotNestedRule].every(Boolean);
};
