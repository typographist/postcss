const { makeBreakpointsModel } = require('@typographist/core/api');
const transformTRootFluid = require('./transformTRootFluid');
const transformTRootWithoutFluid = require('./transformTRootWithoutFluid');

module.exports = (atrule, config) => {
  const { parent } = atrule;
  const breakpoints = makeBreakpointsModel(config);
  const isRootRule = parent.selector === ':root';

  if ([parent, !isRootRule].every(Boolean)) {
    atrule.remove();
  } else if (transformTRootWithoutFluid.test(atrule)) {
    transformTRootWithoutFluid(atrule, breakpoints);
  } else if (transformTRootFluid.test(atrule)) {
    transformTRootFluid(atrule, breakpoints);
  }
};

module.exports.test = (atrule) => atrule.name === 't-root';
