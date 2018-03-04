const postcss = require('postcss');
const transform = require('./transformator/transform');
const transformMsUnit = require('./transformator/transformMsUnit');

const defaultConfig = {
  base: '16px',
  lineHeight: 1.5,
  ratio: 1.333,
};

const plugin = postcss.plugin(
  'new-typography',
  (config = defaultConfig) => root => {
    root.walkDecls(decl => {
      if (transformMsUnit.test(decl, config)) {
        transformMsUnit(decl, config);
      }
    });
    root.walk(node => {
      transform(node, config);
    });
  },
);

module.exports = plugin;
