const postcss = require('postcss');
const transformMsUnit = require('./lib/transformMsUnit');

const defualtConfig = {
  base: '16px',
  lineHeight: 1.5,
  ratio: 1.333,
};

const plugin = postcss.plugin(
  'new-typography',
  (config = defualtConfig) => root => {
    root.walk(node => {
      if (transformMsUnit.test(node)) transformMsUnit(node, config);
    });
  },
);

module.exports = plugin;
