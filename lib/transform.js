const transformTRoot = require('./transformTRoot');
const transformMsUnit = require('./transformMsUnit');
const transformTBase = require('./transformTBase');
const transformBubblingAtrule = require('./transformBubblingAtrule');

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
};
