const cleanNode = require('../../utils/cleanNode');
const transformAfterNodes = require('../../utils/transformAfterNodes');

module.exports = atrule => {
  cleanNode(atrule);
  transformAfterNodes(atrule);

  const innerNodes = atrule.nodes.slice(0).map(cleanNode);
  const parentCloneForNodesWithinAtrule = cleanNode(
    atrule.parent.clone(),
  ).removeAll();

  atrule.prepend(parentCloneForNodesWithinAtrule);
  parentCloneForNodesWithinAtrule.append(innerNodes);

  const parent = atrule.parent.after(atrule);

  if (!parent.nodes.length) {
    parent.remove();
  }
};

module.exports.test = atrule => {
  const { parent, name } = atrule;
  const isTAbove = name === 't-above';
  const isTBelow = name === 't-below';
  const isTOnly = name === 't-only';
  const isTBetween = name === 't-between';
  return (
    [isTAbove, isTBelow, isTOnly, isTBetween].some(Boolean) &&
    parent &&
    parent.type === 'rule'
  );
};
