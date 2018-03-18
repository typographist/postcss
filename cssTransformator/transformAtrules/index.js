const transformBubblingAtrule = require('./transformBubblingAtrule');
const transformTAbove = require('./transformTAbove');
const transformTBase = require('./transformTBase');
const transformTBelow = require('./transformTBelow');
const transformTBetween = require('./transformTBetween');
const transformFontSize = require('./transformTFontSize');
const transformTOnly = require('./transformTOnly');
const transformTRoot = require('./transformTRoot');

module.exports = (atrule, config) => {
  if (transformTRoot.test(atrule)) {
    transformTRoot(atrule, config);
  }

  if (transformTBase.test(atrule)) {
    transformTBase(atrule, config);
  }

  if (transformBubblingAtrule.test(atrule)) {
    transformBubblingAtrule(atrule);
  }

  if (transformTAbove.test(atrule)) {
    transformTAbove(atrule, config);
  }

  if (transformTBelow.test(atrule)) {
    transformTBelow(atrule, config);
  }

  if (transformTBetween.test(atrule)) {
    transformTBetween(atrule, config);
  }

  if (transformFontSize.test(atrule)) {
    transformFontSize(atrule, config);
  }

  if (transformTOnly.test(atrule)) {
    transformTOnly(atrule, config);
  }
};
