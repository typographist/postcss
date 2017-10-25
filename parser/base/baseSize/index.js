const mediaDecl = require('../../decls/mediaDecl');
const bodyRule = require('../bodyRule');
const toRem = require('../../../helpers/toRem');
const fontSizeDecl = require('../../decls/fontSizeDecl');
const lineHeightDecl = require('../../decls/lineHeightDecl');

const baseSize = (node, breakpoints) => {
  const parent = node.parent;
  if (parent && parent.selector !== 'body') {
    node.remove();
  } else {
    const breakpoint = breakpoints.find(b => /^0/.test(b.value));

    breakpoints
      .filter(b => b.value !== '0px')
      .reverse()
      .map(b => node.parent.after(mediaDecl({
        minWidth: b.value,
        nestedRule: bodyRule(b.base, b.root),
      })));

    const fontSize = `${toRem(breakpoint.base, breakpoint.root)}rem`;
    node.replaceWith(fontSizeDecl(fontSize), lineHeightDecl());
  }
};

module.exports = baseSize;
