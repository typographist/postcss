const { camelize } = require('humps');
const { calcFontSize } = require('../api/calcFontSize');
const store = require('../api/store');
const {
  CONTAINS_FONT_SIZE,
  MS_UNIT,
  POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_WITH_MS_UNIT_MEASURE,
} = require('./constants');
const {
  checkIsBreakpointName,
  getBreakpointsList,
  getBreakpointsNames,
  removeBrackets,
} = require('./helpers');

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
  const breakpointsNames = getBreakpointsNames(store, config);
  const breakpointsList = getBreakpointsList(breakpointsNames);

  try {
    if (isRoot) {
      postcssNode.value = calcFontSize(target, breakpoints);
    } else if ([isAbove, isBelow].some(Boolean)) {
      const atruleRawValue = camelize(removeBrackets(atruleParams));
      const hasBreakpointName = checkIsBreakpointName(atruleRawValue);

      if (hasBreakpointName) {
        postcssNode.value = calcFontSize(target, breakpoints, atruleRawValue);
      } else {
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
