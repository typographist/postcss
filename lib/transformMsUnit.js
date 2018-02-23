const { camelize, decamelize } = require('humps');
const { calcFontSize } = require('../api/calcFontSize');
const {
  ALL_ROUND_BRACKETS,
  CONTAINS_FONT_SIZE,
  MS_UNIT,
} = require('./constants');
const store = require('../api/store');
const { isNumeric } = require('../helpers');

/* eslint-disable consistent-return */
const checkIsValidFontSize = node => {
  const rawFontSize = Number(node.value.replace(/ms/, ''));

  try {
    if (isNumeric(rawFontSize)) {
      return true;
    }
    node.remove();
    throw new Error(`${node.value} is invalid ms value.`);
  } catch (err) {
    console.warn(err);
  }
};
/* eslint-enable */

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
  if (checkIsValidFontSize(node)) {
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
            .map(breakpointName =>
              decamelize(breakpointName, { separator: '-' }),
            )
            .join(', ');
          closestRule.remove();
          throw new Error(
            `${atruleRawValue} is invalid breakpoint name. use ${breakpointsList} to convert ms to rem`,
          );
        }
      } else if ([!isRoot, !isAbove, !isBelow].every(Boolean)) {
        closestRule.remove();
        throw new Error(
          'Use the @t-above or @t-below to calculate the ms value',
        );
      }
    } catch (err) {
      console.warn(err.message);
    }
  }
};

module.exports.test = node => {
  const { type, prop, value } = node;
  const isDecl = type === 'decl';
  const hasFontSize = CONTAINS_FONT_SIZE.test(prop);
  const hasMsUnit = MS_UNIT.test(value);

  return [isDecl, hasFontSize, hasMsUnit].every(Boolean);
};
