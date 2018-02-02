const postcss = require('postcss');
const calculate = require('./api/store');
const rootSize = require('./parser/root/rootSize');
const baseSize = require('./parser/base/baseSize');
const above = require('./parser/breakpoints/above');
const nt = require('./parser/ntFunction');
const {
  CONTAINS_POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_AND_NT_UNIT,
} = require('./regex/');

const defualtConfig = {
  base: '16px',
  lineHeight: 1.5,
  ratio: 1.333,
};

const plugin = postcss.plugin('new-typography', (config = defualtConfig) => {
  const breakpoints = calculate(config);

  return root => {
    root.walk(node => {
      if (node.name === 'nt-root') {
        rootSize(node, breakpoints);
      } else if (node.name === 'nt-base') {
        baseSize(node, breakpoints);
      } else if (node.name === 'nt-above') {
        above(node, breakpoints);
      } else if (node.name === 'nt-below') {
        console.log('------ below');
      } else if (node.name === 'nt-between') {
        console.log('------ between');
      } else if (
        CONTAINS_POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_AND_NT_UNIT.test(
          node.value,
        )
      ) {
        nt(node, breakpoints, root);
        console.log('------ nt');
      }
    });
  };
});

module.exports = plugin;
