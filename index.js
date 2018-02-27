const postcss = require('postcss');
const transform = require('./transformator/transform');

const defaultConfig = {
  base: '16px',
  lineHeight: 1.5,
  ratio: 1.333,
};

const plugin = postcss.plugin(
  'new-typography',
  (config = defaultConfig) => root => {
    root.walk(node => {
      transform(node, config);
    });
  },
);

module.exports = plugin;
