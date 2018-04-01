const calcFontSize = require('./calcFontSize');
const { getFirstBreakpoint } = require('../breakpoints');
const { getBase, toRem } = require('../../helpers');

/**
 * @param {number} target
 * @param {array<object>} breakpoints
 * @param {string} breakpointName
 * @return {number}
 */

module.exports = (target, breakpoints, breakpointName) => {
  let fontSize = null;

  if (breakpointName === undefined) {
    const firstBreakpoint = getFirstBreakpoint(breakpoints);
    const base = getBase(firstBreakpoint.base);
    const { ratio, root } = firstBreakpoint;
    fontSize = calcFontSize(target, base, ratio);

    return `${toRem(fontSize, root)}rem`;
  }

  const breakpoint = breakpoints.find(b => b.name === breakpointName);
  const { base, ratio, root } = breakpoint;
  fontSize = calcFontSize(target, base, ratio);

  return `${toRem(fontSize, root)}rem`;
};
