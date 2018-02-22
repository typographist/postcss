const { camelize, decamelize } = require('humps');
const { calcFontSize } = require('../api/calcFontSize');
const {
  ALL_ROUND_BRACKETS,
  CONTAINS_FONT_SIZE,
  MS_UNIT,
  POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_WITH_MS_UNIT_MEASURE,
} = require('./constants');
const store = require('../api/store');

const replaceBrackets = atRuleParams =>
  atRuleParams.replace(ALL_ROUND_BRACKETS, '');

const getClosestRule = node => {
  let selectorParent = node.parent;

  while (selectorParent && selectorParent.type !== 'atrule') {
    selectorParent = selectorParent.parent;
    if (selectorParent.type === 'root') {
      return selectorParent;
    }
  }

  return selectorParent;
};

module.exports = (node, config) => {
  const postcssNode = node;
  const breakpoints = store(config);
  const closestRule = getClosestRule(node);
  const { type, params: atruleParams, name } = closestRule;
  const isRoot = type === 'root';
  const isAbove = name === 't-above';
  const isBelow = name === 't-below';
  const target = node.value.replace(MS_UNIT, '');

  const breakpointsWithNames = breakpoints
    .map(breakpoint => breakpoint.name)
    .filter(b => b !== 'default');

  const checkHasBreakpointNameInStore = breakpointName =>
    breakpointsWithNames.some(item => item === breakpointName);

  try {
    if (isRoot) {
      postcssNode.value = calcFontSize(target, breakpoints);
    } else if ([isAbove, isBelow].some(Boolean)) {
      const atruleRawValue = camelize(replaceBrackets(atruleParams));
      const hasBreakpointName = checkHasBreakpointNameInStore(atruleRawValue);

      if (hasBreakpointName) {
        postcssNode.value = calcFontSize(target, breakpoints, atruleRawValue);
      } else {
        const breakpointsList = breakpointsWithNames
          .map(breakpointName => decamelize(breakpointName, { separator: '-' }))
          .join(', ');

        closestRule.remove();
        throw new Error(
          `${atruleRawValue} is invalid breakpoint name. use ${breakpointsList} to convert ms to rem`,
        );
      }
    } else if ([!isRoot, !isAbove, !isBelow].every(Boolean)) {
      closestRule.remove();
      throw new Error('Use the @t-above or @t-below to calculate the ms value');
    }
  } catch (err) {
    console.warn(err.message);
  }
};

module.exports.test = node => {
  const isDecl = node.type === 'decl';
  const isContainsFontSize = CONTAINS_FONT_SIZE.test(node.prop);
  const isContainsTUnit = POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_WITH_MS_UNIT_MEASURE.test(
    node.value,
  );
  return [isDecl, isContainsFontSize, isContainsTUnit].every(Boolean);
};
