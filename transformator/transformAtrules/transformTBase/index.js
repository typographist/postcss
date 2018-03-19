const postcss = require('postcss');
const { mediaAtrule } = require('../../atrules');
const { fontSizeDecl, lineHeightDecl } = require('../../decls');
const { getFirstBreakpoint } = require('../../../api/breakpoints');
const { toRem } = require('../../../helpers');
const { makeBreakpointsModel } = require('../../../api/makeBreakpointsModel');

const bodyRule = (baseSize, rootSize) => {
  const body = postcss.rule({
    selector: 'body',
  });
  const base = `${toRem(baseSize, rootSize)}rem`;
  body.append(fontSizeDecl(base));

  return body;
};

module.exports = (atrule, config) => {
  const { parent } = atrule;
  const breakpoints = makeBreakpointsModel(config);

  if (parent && parent.selector !== 'body') {
    atrule.remove();
  } else {
    const firstBreakpoint = getFirstBreakpoint(breakpoints);

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

    const fontSize = `${toRem(firstBreakpoint.base, firstBreakpoint.root)}rem`;
    atrule.replaceWith(fontSizeDecl(fontSize), lineHeightDecl());
  }
};

module.exports.test = atrule => atrule.name === 't-base';
