const cleanNode = require('../../utils/clean-node');
const transformAfterNodes = require('../../utils/transform-after-nodes');

/**
 * Pull atrule out of the parent selector.
 * Put it after the parent selector and put in the atrule the clone of the parent selector along with its values.
 *
 * @param {Object} atrule Css atrule.
 * @return {void}
 */
module.exports = (atrule) => {
  cleanNode(atrule);
  transformAfterNodes(atrule);

  const innerNodes = atrule.nodes.slice(0).map(cleanNode);
  const parentCloneForNodesWithinAtrule = cleanNode(
    atrule.parent.clone(),
  ).removeAll();

  atrule.prepend(parentCloneForNodesWithinAtrule);
  parentCloneForNodesWithinAtrule.append(innerNodes);

  const parent = atrule.parent.after(atrule);
  cleanNode(atrule);

  if (!parent.nodes.length) parent.remove();
};

/**
 * Verify the name atrule. If the name contains
 * "t-above", "t-below", "t-only" or "t-between" return true, else return false.
 *
 * @param {Object} atrule Css atrule.
 * @return {boolean} Corresponds to the specified pattern or not.
 */
module.exports.test = (atrule) => {
  const { parent, name } = atrule;
  const listOfAtrules = ['t-above', 't-below', 't-only', 't-between'];
  return listOfAtrules.includes(name) && parent && parent.type === 'rule';
};
