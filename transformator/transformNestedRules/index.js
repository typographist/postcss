const { ALL_AMPERSANDS, HAS_AMPERSAND } = require('../../constants/regexes');
const cleanNode = require('../utils/cleanNode');
const transformAfterNodes = require('../utils/transformAfterNodes');

/**
 *
 * @param {Object} rule Css rule.
 * @returns {void}
 */
module.exports = rule => {
  const postcssNode = rule;
  cleanNode(rule);
  transformAfterNodes(rule);
  rule.nodes.slice(0).map(cleanNode);
  postcssNode.selector = rule.selector.replace(
    ALL_AMPERSANDS,
    rule.parent.selector,
  );

  rule.parent.after(rule);
  cleanNode(rule);

  if (!rule.nodes.length) {
    rule.remove();
  }
};

/**
 *
 * @param {Object} rule Css rule.
 * @return {boolean} Nested rule or not.
 */
module.exports.test = rule => {
  const { parent } = rule;
  const isNestedRule = HAS_AMPERSAND.test(rule.selector);
  const parentTypeIsRule = parent.type === 'rule';
  return [parent, isNestedRule, parentTypeIsRule].every(Boolean);
};
