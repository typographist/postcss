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
  const breakpoints = store(config);
  const breakpointsWithNames = breakpoints
    .map(b => b.name)
    .filter(b => b !== 'default');

  const postcssNode = node;
  const closestRule = getClosestRule(node);
  const isRoot = closestRule.type === 'root';
  const isAbove = closestRule.name === 'above';
  const isBelow = closestRule.name === 'below';
  const target = node.value.replace(MS_UNIT, '');
  const atruleParams = closestRule.params;
  const checkHasBreakpointNameInStore = name =>
    breakpointsWithNames.some(breakpointName => breakpointName === name);

  try {
    if (isRoot) {
      postcssNode.value = calcFontSize(target, breakpoints);
      // If atrule name equal Above or Below
    } else if ([isAbove, isBelow].some(Boolean)) {
      const atruleRawValue = replaceBrackets(atruleParams);

      if (checkHasBreakpointNameInStore(atruleRawValue)) {
        postcssNode.value = calcFontSize(target, breakpoints, atruleRawValue);
      }
    } else {
      throw new Error(`Use the @above or @below to calculate the ms value`);
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
