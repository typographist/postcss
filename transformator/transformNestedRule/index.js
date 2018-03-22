const { AMPERSAND, HAS_AMPERSAND } = require('../../constants/regexes');
const cleanNode = require('../utils/cleanNode');
const transformAfterNodes = require('../utils/transformAfterNodes');

/**
 * @example &__inner => __inner
 * @param {string} selector Css selector.
 * @return {string} Selector without ampersand.
 */
const removeAmpersand = selector => selector.replace(AMPERSAND, '');

/**
 *
 * @param {Object} node Css node.
 * @returns {void}
 */
module.exports = node => {
  const postcssNode = node;
  cleanNode(node);
  transformAfterNodes(node);
  node.nodes.slice(0).map(cleanNode);
  postcssNode.selector = node.parent.selector + removeAmpersand(node.selector);

  node.parent.after(node);

  if (!node.nodes.length) {
    node.remove();
  }
};

/**
 *
 * @param {Object} node Css node.
 * @return {boolean} Nested rule or not.
 */
module.exports.test = node => {
  const { parent, type } = node;
  const isRule = type === 'rule';
  const isNestedRule = HAS_AMPERSAND.test(node.selector);
  const parentTypeIsRule = parent.type === 'rule';
  return [parent, isRule, isNestedRule, parentTypeIsRule].every(Boolean);
};
