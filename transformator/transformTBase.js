const postcss = require('postcss');
const { mediaAtrule } = require('./atrules');
const { fontSizeDecl, lineHeightDecl } = require('./decls');
const { toRem } = require('../helpers');
const store = require('../api/store');

const bodyRule = (baseSize, rootSize) => {
  const body = postcss.rule({
    selector: 'body',
  });
  const base = `${toRem(baseSize, rootSize)}rem`;
  body.append(fontSizeDecl(base));

  return body;
};

module.exports = (node, config) => {
  const { parent } = node;
  const breakpoints = store(config);

  if (parent && parent.selector !== 'body') {
    node.remove();
  } else {
    const breakpoint = breakpoints.find(b => /^0/.test(b.value));

    breakpoints
      .filter(b => b.value !== '0px')
      .reverse()
      .map(b =>
        parent.after(
          mediaAtrule({
            minWidth: b.value,
            nestedRule: bodyRule(b.base, b.root),
          }),
        ),
      );

    const fontSize = `${toRem(breakpoint.base, breakpoint.root)}rem`;
    node.replaceWith(fontSizeDecl(fontSize), lineHeightDecl());
  }
};

module.exports.test = node => {
  const isAtrule = node.type === 'atrule';
  const isTBase = node.name === 't-base';

  return [isAtrule, isTBase].every(Boolean);
};
