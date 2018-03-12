const calcFontSize = require('./calcFontSize');
const { FIRST_BREAKPOINT } = require('../../constants');
const { getBase, toRem } = require('../../helpers/');

/**
 * @param {number} target
 * @param {array<object>} breakpoints
 * @param {string} breakpointName
 * @return {number}
 */

module.exports = (target, breakpoints, breakpointName) => {
  let fontSize = null;

  if (breakpointName === undefined) {
    const breakpoint = breakpoints.find(b => FIRST_BREAKPOINT.test(b.value));
    const base = getBase(breakpoint.base);
    const { ratio, root } = breakpoint;
    fontSize = calcFontSize(target, base, ratio);

    return `${toRem(fontSize, root)}rem`;
  }

  const breakpoint = breakpoints.find(b => b.name === breakpointName);
  const { base, ratio, root } = breakpoint;
  fontSize = calcFontSize(target, base, ratio);

  return `${toRem(fontSize, root)}rem`;
};
