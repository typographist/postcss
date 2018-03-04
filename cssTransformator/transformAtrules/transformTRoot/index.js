const makeBreakpointsModel = require('../../../utils/makeBreakpointsModel');
const transformTRootFluid = require('./transformTRootFluid');
const transformTRootWithoutFluid = require('./transformTRootWithoutFluid');

module.exports = (node, config) => {
  const { parent } = node;
  const breakpoints = makeBreakpointsModel(config);
  const isRootRule = parent.selector === ':root';

  if ([parent, !isRootRule].every(Boolean)) {
    node.remove();
  } else if (transformTRootWithoutFluid.test(node)) {
    transformTRootWithoutFluid(node, breakpoints);
  } else if (transformTRootFluid.test(node)) {
    transformTRootFluid(node, breakpoints);
  }
};

module.exports.test = node => {
  const isAtrule = node.type === 'atrule';
  const isTRoot = node.name === 't-root';

  return [isAtrule, isTRoot].every(Boolean);
};
