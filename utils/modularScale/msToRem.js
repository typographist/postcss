const { getBase, toRem } = require('../../helpers/');
const calcFontSize = require('./calcFontSize');

/**
 * @param {number} target
 * @param {array<object>} breakpoints
 * @param {string} breakpointName
 * @return {number}
 */

module.exports = (target, breakpoints, breakpointName) => {
  let fontSize = null;

  if (breakpointName === undefined) {
    const breakpoint = breakpoints.find(b => /^0/.test(b.value));
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
