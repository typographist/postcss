const transformBubblingAtrule = require('./transformBubblingAtrule');
const transformMsUnit = require('./transformMsUnit');
const transformTRoot = require('./transformTRoot');
const transformTBase = require('./transformTBase');
// const transformTAbove = require('./transformTAbove');
// const transformTBelow = require('./transformTBelow');
// const transformTBetween = require('./transformTBetween');

module.exports = (node, config) => {
  if (transformTRoot.test(node)) {
    transformTRoot(node, config);
  }

  if (transformTBase.test(node)) {
    transformTBase(node, config);
  }

  if (transformMsUnit.test(node, config)) {
    transformMsUnit(node, config);
  }

  if (transformBubblingAtrule.test(node)) {
    transformBubblingAtrule(node);
  }

  // if (transformTAbove.test(node)) {
  //   transformTAbove(node, config);
  // }

  // if (transformTBelow.test(node)) {
  //   transformTBelow(node, config);
  // }

  // if (transformTBetween.test(node)) {
  //   transformTBetween(node, config);
  // }
};
