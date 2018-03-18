const postcss = require('postcss');
const { mediaAtrule } = require('../../atrules');
const { MS_UNIT } = require('../../../constants/regexes');
const { fontSizeDecl } = require('../../decls');
const {
  getFirstBreakpoint,
  removeRoundBrackets,
} = require('../../../utils/breakpoints');
const msToRem = require('../../../utils/modularScale/msToRem');
const { percentage } = require('../../../helpers');
const {
  makeBreakpointsModel,
} = require('../../../utils/makeBreakpointsModel/');

const setParentSelector = parent => {
  const rule = postcss.rule({
    selector: parent.selector,
  });

  return rule;
};

module.exports = (atrule, config) => {
  const { parent, params } = atrule;
  const breakpoints = makeBreakpointsModel(config);
  const firstBreakpoint = getFirstBreakpoint(breakpoints);

  const target = parseFloat(removeRoundBrackets(params).replace(MS_UNIT, ''));

  breakpoints
    .filter(b => b.value !== '0px')
    .reverse()
    .map(b =>
      parent.after(
        mediaAtrule({
          minWidth: b.value,
          nestedRule: setParentSelector(parent).append(
            fontSizeDecl(msToRem(target, breakpoints, b.name)),
          ),
        }),
      ),
    );

  const fontSize = msToRem(target, breakpoints);
  atrule.replaceWith(fontSizeDecl(fontSize));
};

module.exports.test = atrule => {
  const isTFontSize = atrule.name === 't-font-size';
  const hasParent = atrule.parent;
  const hasParams = atrule.params;

  return [isTFontSize, hasParent, hasParams].every(Boolean);
};
