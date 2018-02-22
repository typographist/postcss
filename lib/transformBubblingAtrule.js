module.exports = node => {};

module.exports.test = node => {
  const isAtrule = node.type === 'atrule';
  const checkHasContainsAtruleName = postcssNode =>
    ['document', 'media', 'supports', 'above', 'below', 'between'].some(
      atruleName => atruleName === postcssNode.name,
    );

  return [(isAtrule, checkHasContainsAtruleName(node))].every(Boolean);
};
