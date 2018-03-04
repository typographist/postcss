const store = require('../../api/store');
const transformTRootFluid = require('./transformTRootFluid');
const transformTRoot = require('./transformTRoot');

module.exports = (node, config) => {
  const { parent } = node;
  const breakpoints = store(config);
  const isRootRule = parent.selector === ':root';

  if ([parent, !isRootRule].every(Boolean)) {
    node.remove();
  } else if (transformTRoot.test(node)) {
    console.log('breakpoints from root', breakpoints);
    transformTRoot(node, breakpoints);
  } else if (transformTRootFluid.test(node)) {
    console.log('breakpoints from fluid', breakpoints);
    transformTRootFluid(node, breakpoints);
  }
};

module.exports.test = node => {
  const isAtrule = node.type === 'atrule';
  const isTRoot = node.name === 't-root';

  return [isAtrule, isTRoot].every(Boolean);
};
