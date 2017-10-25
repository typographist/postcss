const postcss = require('postcss');
const calculate = require('./api/calculator');
const rootSize = require('./parser/root/rootSize');
const baseSize = require('./parser/base/baseSize');

const defualtConfig = {
  base: '16px',
  lineHeight: 1.5,
  ratio: 1.333,
};

const plugin = postcss.plugin('new-typography', (config = defualtConfig) => {
  const breakpoints = calculate(config);

  return (root) => {
    root.walkAtRules((node) => {
      switch (node.name) {
        case 'nt-root':
          rootSize(node, breakpoints);
          break;

        // case 'nt-root-fluid'
        //   rootSizeFluid(node);
        //   break;

        case 'nt-base':
          baseSize(node, breakpoints);
          break;

        // case 'nt-base-fluid'
        //   baseSizeFluid(node);
        //   break;

        default:
          break;
      }
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
