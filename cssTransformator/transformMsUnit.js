const { camelize } = require('humps');
const msToRem = require('../utils/modularScale/msToRem');
const { makeBreakpointsModel } = require('../utils/makeBreakpointsModel');
const {
  HAS_FONT_SIZE,
  MS_UNIT,
  POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_WITH_MS_UNIT_MEASURE,
} = require('../constants/regexes');
const {
  breakpointsToCebabCase,
  checkIsBreakpointName,
  getNamesOfBreakpoints,
  removeRoundBrackets,
} = require('../utils/breakpoints');

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
  const namesOfBreakpoints = getNamesOfBreakpoints(config);
  const breakpointsList = breakpointsToCebabCase(namesOfBreakpoints);

  try {
    if (isRoot) {
      postcssNode.value = msToRem(target, breakpoints);
    } else if ([isTAbove, isTBelow, isTOnly].some(Boolean)) {
      const atruleRawValue = camelize(removeRoundBrackets(atruleParams));
      const isBreakpointName = checkIsBreakpointName(
        namesOfBreakpoints,
        atruleRawValue,
      );

      if (isBreakpointName) {
        postcssNode.value = msToRem(target, breakpoints, atruleRawValue);
      } else {
        closestRule.remove();
        throw new Error(
          `${atruleRawValue} is invalid breakpoint name. Use ${breakpointsList} to convert ms to rem`,
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

module.exports.test = decl => {
  const hasFontSize = HAS_FONT_SIZE.test(decl.prop);
  const hasTUnit = POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_WITH_MS_UNIT_MEASURE.test(
    decl.value,
  );

  return [hasFontSize, hasTUnit].every(Boolean);
};
