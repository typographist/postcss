const postcss = require('postcss');
const { mediaAtrule } = require('../../atrules');
const { fontSizeDecl, lineHeightDecl } = require('../../decls');
const { getFirstBreakpoint } = require('../../../api/breakpoints');
const { toRem } = require('../../../helpers');
const { makeBreakpointsModel } = require('../../../api/makeBreakpointsModel');

/**
 * @param {number} baseSize Base font-size.
 * @param {number} rootSize Root root-size.
 * @return {string} Body rule with font-size for each breakpoint.
 */
const createBodyRuleWithDecls = (baseSize, rootSize) => {
  const body = postcss.rule({
    selector: 'body',
  });
  const base = `${toRem(baseSize, rootSize)}rem`;
  body.append(fontSizeDecl(base));

  return body;
};

/**
 * If t-body atrule is specified outside the body rule, delete it.
 * If t-body atrule is specified in body rule, replace it with the font-size weighted values for each breakpoint.
 *
 * @param {Object} atrule @t-base atrule.
 * @param {Object} config User configuration.
 */
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
            nestedRule: createBodyRuleWithDecls(b.base, b.root),
          }),
        ),
      );

    const fontSize = `${toRem(firstBreakpoint.base, firstBreakpoint.root)}rem`;
    atrule.replaceWith(fontSizeDecl(fontSize), lineHeightDecl());
  }
};

/**
 * Does atrule have a @t-base value.
 *
 * @param {Object} atrule Css atrule.
 * @return {boolean} is @t-base or not.
 */
module.exports.test = atrule => atrule.name === 't-base';
