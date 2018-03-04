const transformBubblingAtrule = require('./transformBubblingAtrule');
const transformTAbove = require('./transformTAbove');
const transformTBase = require('./transformTBase');
const transformTBetween = require('./transformTBetween');
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

  if (transformTBetween.test(node)) {
    transformTBetween(node, config);
  }
};
