const { cleanNode, transformAfterNodes } = require('../../helpers');

exports.isBubblingAtrule = ({ parent, name }) =>
  isValidMediaQuery(name) && parent && parent.type === 'rule';

exports.bubblingAtrule = (atrule) => {
  cleanNode(atrule);
  transformAfterNodes(atrule);

  const parentClone = atrule.parent.clone();
  const innerNodes = atrule.nodes.map(cleanNode);

  atrule.prepend(cleanNode(parentClone).removeAll());

  cleanNode(parentClone)
    .removeAll()
    .append(innerNodes);

  const parent = atrule.parent.after(atrule);
  cleanNode(atrule);

  if (!parent.nodes.length) parent.remove();
};

function isValidMediaQuery(name) {
  return /^(up|down|only|between)$/.test(name);
}
