const cleanNode = require('./utils/cleanNode');
const transformAfterNodes = require('./utils/transformAfterNodes');

const removeAmpersand = selector => selector.replace(/&/, '');

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

module.exports.test = node => {
  const { parent, type } = node;
  const isRule = type === 'rule';
  const isNestedRule = /^&/.test(node.selector);
  const parentTypeIsRule = parent.type === 'rule';
  return [parent, isRule, isNestedRule, parentTypeIsRule].every(Boolean);
};
