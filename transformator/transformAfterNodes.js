const cleanNode = require('./cleanNode');

module.exports = node => {
  const affectedNodes = node.parent.nodes
    .slice(node.parent.nodes.indexOf(node) + 1)
    .map(cleanNode);

  if (affectedNodes.length) {
    const afterParent = cleanNode(node.parent.clone()).removeAll();
    node.parent.after(afterParent);
    afterParent.append(affectedNodes);

    return afterParent;
  }

  return null;
};
