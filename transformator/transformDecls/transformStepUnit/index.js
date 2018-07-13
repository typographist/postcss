const { camelize } = require('../../../helpers');
const stepToRem = require('../../../api/modularScale/stepToRem');
const { makeBreakpointsModel } = require('../../../api/makeBreakpointsModel');
const {
  ALL_ROUND_BRACKETS,
  HAS_FONT_SIZE,
  STEP_UNIT,
  POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_WITH_STEP_UNIT_MEASURE,
} = require('../../../constants/regexes');
const {
  breakpointsToCebabCase,
  checkIsBreakpointName,
  getNamesOfBreakpoints,
} = require('../../../api/breakpoints');

/**
 *
 * @param {Object} decl Css declaration.
 * @return {Object} Closest rule.
 */
const getClosestRule = decl => {
  let selectorParent = decl.parent;

  while (selectorParent && selectorParent.type !== 'atrule') {
    selectorParent = selectorParent.parent;
    if (selectorParent.type === 'root') {
      return selectorParent;
    }
  }

  return selectorParent;
};

/**
 * @example font-size: "number"ms => "number"rem.
 * @param {Object} decl Css declaration.
 * @param {Object} config User configuration.
 * @return {void}
 */
module.exports = (decl, config) => {
  const postcssNode = decl;
  const breakpoints = makeBreakpointsModel(config);
  const closestRule = getClosestRule(decl);
  const { type, params: atruleParams, name } = closestRule;
  const isRoot = type === 'root';
  const isTAbove = name === 't-above';
  const isTBelow = name === 't-below';
  const isTOnly = name === 't-only';
  const target = decl.value.replace(STEP_UNIT, '');
  const namesOfBreakpoints = getNamesOfBreakpoints(config);
  const breakpointsList = breakpointsToCebabCase(namesOfBreakpoints);

  try {
    if (isRoot) {
      postcssNode.value = stepToRem(target, breakpoints);
    } else if ([isTAbove, isTBelow, isTOnly].some(Boolean)) {
      const atruleRawValue = camelize(
        atruleParams.replace(ALL_ROUND_BRACKETS, ''),
      );
      const isBreakpointName = checkIsBreakpointName(
        namesOfBreakpoints,
        atruleRawValue,
      );

      if (isBreakpointName) {
        postcssNode.value = stepToRem(target, breakpoints, atruleRawValue);
      } else {
        closestRule.remove();
        throw new Error(
          `${atruleRawValue} is invalid breakpoint name. Use ${breakpointsList} to convert step to rem`,
        );
      }
    } else if ([!isRoot, !isTAbove, !isTBelow, !isTOnly].every(Boolean)) {
      closestRule.remove();
      throw new Error(
        'Use the @t-above or @t-below or @t-only to calculate the step value',
      );
    }
  } catch (err) {
    console.warn(err.message);
  }
};

/**
 * Check whether the declaration has a font-size property
 * and whether its value is a positive or negative floating-point number and a unit of measurement ms.
 * @param {Object} decl Css declaration.
 * @return {boolean} Contains or not.
 */
module.exports.test = decl => {
  const hasFontSize = HAS_FONT_SIZE.test(decl.prop);
  const hasStepUnit = POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_WITH_STEP_UNIT_MEASURE.test(
    decl.value,
  );

  return [hasFontSize, hasStepUnit].every(Boolean);
};
