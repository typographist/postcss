const postcss = require('postcss');
const calculate = require('./_api/calculator');
const fontSizeDecl = require('./_parser/fontSizeDecl');
const rootRule = require('./_parser/rootRule');
const bodyRule = require('./_parser/bodyRule');
const mediaDecl = require('./_parser/mediaDecl');
const variableDecl = require('./_parser/variableDecl');
const rootToPersentage = require('./_parser/rootToPersentage');


const defualtConfig = {
  base: '16px',
  lineHeight: 1.5,
  ratio: 1.333,
};

const plugin = postcss.plugin('new-typography', (config = defualtConfig) => {
  const breakpoints = calculate(config);

  const rootSize = (node) => {
    const parent = node.parent;
    if (parent && parent.selector !== ':root') {
      node.remove();
    } else {
      const breakpoint = breakpoints.find(b => /^0/.test(b.value));

      breakpoints
        .reverse()
        .filter(b => b.value !== '0px')
        .map(b => node.parent.after(mediaDecl({
          minWidth: b.value,
          fontSize: b.root,
          nestedRule: rootRule(b.root),
        })));

      breakpoints
        .reverse()
        .filter(b => b.value !== '0px')
        .map(b => node.before(variableDecl({
          name: b.name,
          value: b.value,
        })));

      node.replaceWith(fontSizeDecl(breakpoint.root, rootToPersentage));
    }
  };

  const baseSize = (node) => {
    const parent = node.parent;
    if (parent && parent.selector !== 'body') {
      node.remove();
    } else {
      const breakpoint = breakpoints.find(b => /^0/.test(b.value));
      breakpoints.reverse()
        .filter(b => b.value !== '0px')
        .map(b => node.parent.after(mediaDecl({
          minWidth: b.value,
          fontSize: b.root,
          nestedRule: bodyRule(b.base),
        })));

      breakpoints.reverse()
        .filter(b => b.value !== '0px')
        .map(b => node.before(variableDecl({
          name: b.name,
          value: b.value,
        })));
      node.replaceWith(fontSizeDecl(breakpoint.root));
    }
  };

  return (root) => {
    root.walkAtRules((node) => {
      switch (node.name) {
        case 'nt-root-size':
          rootSize(node);
          break;

        case 'nt-base-size':
          baseSize(node);
          break;

        default:
          break;
      }
    });
  };
});

module.exports = plugin;
