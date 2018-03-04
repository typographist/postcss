const transformBubblingAtrule = require('./transformBubblingAtrule');
const transformTRoot = require('./transformTRoot');
const transformTBase = require('./transformTBase');
const transformTAbove = require('./transformTAbove');

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
};
