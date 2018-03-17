const postcss = require('postcss');
const { mediaAtrule } = require('../../atrules');
const { FIRST_BREAKPOINT } = require('../../../constants');
const { fontSizeDecl, lineHeightDecl } = require('../../decls');
const { toRem } = require('../../../helpers');
const {
  makeBreakpointsModel,
} = require('../../../utils/makeBreakpointsModel/');

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
    const breakpoint = breakpoints.find(b => FIRST_BREAKPOINT.test(b.value));

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
    atrule.replaceWith(fontSizeDecl(fontSize), lineHeightDecl());
  }
};

module.exports.test = atrule => atrule.name === 't-base';
