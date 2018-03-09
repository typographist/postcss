const transformBubblingAtrule = require('./transformBubblingAtrule');
const transformTAbove = require('./transformTAbove');
const transformTBase = require('./transformTBase');
const transformTBelow = require('./transformTBelow');
const transformTBetween = require('./transformTBetween');
const transformTOnly = require('./transformTOnly');
const transformTRoot = require('./transformTRoot');

module.exports = (node, config) => {
  if (transformTRoot.test(node)) {
    transformTRoot(node, config);
  }

  if (transformTBase.test(node)) {
    transformTBase(node, config);
  }

  if (transformBubblingAtrule.test(node)) {
    transformBubblingAtrule(node);
  }

  if (transformTAbove.test(node)) {
    transformTAbove(node, config);
  }

  if (transformTBelow.test(node)) {
    transformTBelow(node, config);
  }

  if (transformTBetween.test(node)) {
    transformTBetween(node, config);
  }

  if (transformTOnly.test(node)) {
    transformTOnly(node, config);
  }
};
