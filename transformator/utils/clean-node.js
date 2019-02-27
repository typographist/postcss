module.exports = (node) => ({
  ...node,
  raws: {
    ...(node.raws.between ? { between: node.raws.between } : {}),
    ...{ semicolon: true },
    ...(node.raws.important ? { important: node.raws.important } : {}),
  },
});
