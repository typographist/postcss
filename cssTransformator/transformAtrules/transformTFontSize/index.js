const postcss = require('postcss');
const { mediaAtrule } = require('../../atrules');
const {
  MS_UNIT,
  POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_WITH_MS_UNIT_MEASURE,
} = require('../../../constants/regexes');
const { fontSizeDecl } = require('../../decls');
const { removeRoundBrackets } = require('../../../utils/breakpoints');
const msToRem = require('../../../utils/modularScale/msToRem');
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
  const { name, parent, params } = atrule;
  const isTFontSize = name === 't-font-size';
  const hasParent = parent;
  const hasParams = params;
  const hasNumberWithMsUnit = POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_WITH_MS_UNIT_MEASURE.test(
    removeRoundBrackets(params),
  );
  let result = null;

  if ([isTFontSize, hasParent, hasParams].every(Boolean)) {
    try {
      if (hasNumberWithMsUnit) {
        result = true;
      } else {
        result = false;
        throw new Error(`
          "${removeRoundBrackets(
            params,
          )}" is incorrect value. Use positive or negative floating point number with ms unit measure.
          `);
      }
    } catch (err) {
      console.warn(err.message);
    }
  }

  return result;
};
