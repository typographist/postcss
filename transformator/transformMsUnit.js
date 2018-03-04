const { camelize } = require('humps');
const { msToRem } = require('../msToRem');
const makeBreakpointsModel = require('../makeBreakpointsModel');
const {
  HAS_FONT_SIZE,
  MS_UNIT,
  POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_WITH_MS_UNIT_MEASURE,
} = require('../constants/regexes');
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
  const breakpoints = makeBreakpointsModel(config);
  const closestRule = getClosestRule(node);
  const { type, params: atruleParams, name } = closestRule;
  const isRoot = type === 'root';
  const isTAbove = name === 't-above';
  const isTBelow = name === 't-below';
  const isTOnly = name === 't-only';
  const target = node.value.replace(MS_UNIT, '');
  const breakpointsNames = getBreakpointsNames(makeBreakpointsModel, config);
  const breakpointsList = getBreakpointsList(breakpointsNames);

  try {
    if (isRoot) {
      postcssNode.value = msToRem(target, breakpoints);
    } else if ([isTAbove, isTBelow, isTOnly].some(Boolean)) {
      const atruleRawValue = camelize(removeBrackets(atruleParams));
      const isBreakpointName = checkIsBreakpointName(
        breakpointsNames,
        atruleRawValue,
      );

      if (isBreakpointName) {
        postcssNode.value = msToRem(target, breakpoints, atruleRawValue);
      } else {
        closestRule.remove();
        throw new Error(
          `${atruleRawValue} is invalid breakpoint name. use ${breakpointsList} to convert ms to rem`,
        );
      }
    } else if ([!isRoot, !isTAbove, !isTBelow, !isTOnly].every(Boolean)) {
      closestRule.remove();
      throw new Error(
        'Use the @t-above or @t-below or @t-only to calculate the ms value',
      );
    }
  } catch (err) {
    console.warn(err.message);
  }
};

module.exports.test = node => {
  const hasFontSize = HAS_FONT_SIZE.test(node.prop);
  const hasTUnit = POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_WITH_MS_UNIT_MEASURE.test(
    node.value,
  );

  return [hasFontSize, hasTUnit].every(Boolean);
};
