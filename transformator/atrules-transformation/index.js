const transformBubblingAtrule = require('./transform-bubbling-atrule');
const transformTAbove = require('./transform-up');
const transformTBase = require('./transform-base');
const transformTBelow = require('./transform-down');
const transformTBetween = require('./transform-between');
const transformTOnly = require('./transform-only');
const transformTRoot = require('./transform-root');

export const transformAtrules = (atrule, config) => {
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

  if (transformTOnly.test(atrule)) {
    transformTOnly(atrule, config);
  }
};
