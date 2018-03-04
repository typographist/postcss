const cleanNode = require('../../utils/cleanNode');
const transformAfterNodes = require('../../utils/transformAfterNodes');

module.exports = node => {
  cleanNode(node);
  transformAfterNodes(node);

  const innerNodes = node.nodes.slice(0).map(cleanNode);
  const parentCloneForNodesWithinAtrule = cleanNode(
    node.parent.clone(),
  ).removeAll();

  node.prepend(parentCloneForNodesWithinAtrule);
  parentCloneForNodesWithinAtrule.append(innerNodes);

  const parent = node.parent.after(node);

  if (!parent.nodes.length) {
    parent.remove();
  }
};

module.exports.test = node => {
  const { parent, type } = node;
  return (
    type === 'atrule' &&
    ['t-above', 't-below', 't-between', 't-only'].some(Boolean) &&
    parent &&
    parent.type === 'rule'
  );
};
