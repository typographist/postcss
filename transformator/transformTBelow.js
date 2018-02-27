const { removeBrackets } = require('./helpers');

module.exports = (node, config) => {
  const postcssNode = node;
  postcssNode.name = 'media';
  postcssNode.params = `screen and (max-width: ${removeBrackets(node.params)})`;
};

module.exports.test = node =>
  [node.type === 'atrule', node.name === 't-below'].every(Boolean);
