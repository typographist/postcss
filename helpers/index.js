const cleanNode = (node) => {
  node.raws = {
    ...(node.raws.between ? { between: node.raws.between } : {}),
    ...{ semicolon: true },
    ...(node.raws.important ? { important: node.raws.important } : {}),
  };

  return node;
};

const transformAfterNodes = (node) => {
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

module.exports = {
  cleanNode,
  transformAfterNodes,
};
