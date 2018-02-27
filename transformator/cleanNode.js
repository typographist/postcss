module.exports = node => {
  const postcssNode = node;
  postcssNode.raws = {
    ...(node.raws.between ? { between: node.raws.between } : {}),
    ...{ semicolon: true },
    ...(node.raws.important ? { important: node.raws.important } : {}),
  };

  return node;
};
