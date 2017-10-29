const postcss = require('postcss');
const calculate = require('./api/calculator');
const rootSize = require('./parser/root/rootSize');
const baseSize = require('./parser/base/baseSize');
const above = require('./parser/breakpoints/above');
const ntFn = require('./parser/nt');
const CONTAINS_NT_FUNCTION = require('./regex/').CONTAINS_NT_FUNCTION;

const defualtConfig = {
  base: '16px',
  lineHeight: 1.5,
  ratio: 1.333,
};

const plugin = postcss.plugin('new-typography', (config = defualtConfig) => {
  const breakpoints = calculate(config);

  return (root, result) => {
    root.walk((node) => {
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
      } else if (CONTAINS_NT_FUNCTION.test(node.value)) {
        ntFn(node, breakpoints, root);
        console.log('------ nt');
      }
      // switch (node.name) {
      //   case 'nt-root':
      //     rootSize(node, breakpoints);
      //     break;

      //   case 'nt-base':
      //     baseSize(node, breakpoints);
      //     break;

      //   case 'nt-above':
      //     above(node, breakpoints);
      //     break;

      //   case 'nt-below':
      //     break;

      //   case 'nt-between':
      //     break;

      //   default:
      //     break;
      // }
    });
  };
});

module.exports = plugin;

// toDo
/*
1) Breakpoints
  a) above
  b) below
  c) between

2) Nt
3) Css variables support
4) Root fluid
5) Base fluid
6) Nt fluid
7) Margins for headings
*/
