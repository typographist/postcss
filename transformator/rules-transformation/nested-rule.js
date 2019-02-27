const {
  AMPERSAND,
  LAST_COMMA,
  LINE_BREAKS_AND_SPACES,
  COMMA_AND_NEW_LINE,
} = require('@typographist/core/constants');
const cleanNode = require('../utils/clean-node');
const transformAfterNodes = require('../utils/transform-after-nodes');

/**
 *
 * @param {Object} rule Css rule.
 * @returns {void}
 */
module.exports = (rule) => {
  const postcssNode = rule;

  cleanNode(rule);
  transformAfterNodes(rule);
  rule.nodes.slice(0).map(cleanNode);

  const parentRulesList = postcssNode.parent.selector
    .replace(LAST_COMMA, '')
    .replace(LINE_BREAKS_AND_SPACES, '')
    .split(',');

  const nestedRulesList = postcssNode.selector
    .replace(LAST_COMMA, '')
    .replace(LINE_BREAKS_AND_SPACES, '')
    .split(',');

  let selectorName = '';
  for (let i = 0; i < parentRulesList.length; i += 1) {
    for (let j = 0; j < nestedRulesList.length; j += 1) {
      selectorName +=
        nestedRulesList[j].replace(AMPERSAND, parentRulesList[i]) +
        COMMA_AND_NEW_LINE;
    }
  }

  postcssNode.selector = selectorName.replace(LAST_COMMA, '');
  postcssNode.parent.selector = postcssNode.parent.selector.replace(
    LAST_COMMA,
    '',
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
module.exports.test = (rule) => {
  const { parent } = rule;
  const isNestedRule = AMPERSAND.test(rule.selector);
  const parentTypeIsRule = parent.type === 'rule';
  return [parent, isNestedRule, parentTypeIsRule].every(Boolean);
};
