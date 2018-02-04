const { isArray, getBase, toRem } = require('../../helpers');

/**
 * @param {number} target
 * @param {number} base
 * @param {number} ratio
 * @return {number}
 */
const calculator = (target, base, ratio) => {
  if (!isArray(base) || base.length === 1) {
    return Math.round(ratio ** target * base);
  }

  const cloneBase = base.slice();
  const baseHigh = ratio ** 1 * cloneBase[0];

  for (let i = 1; i < cloneBase.length; i + 1) {
    while (cloneBase[i] / 1 < cloneBase[0] / 1) {
      cloneBase[i] *= ratio ** 1;
    }
    while (cloneBase[i] / 1 >= baseHigh / 1) {
      cloneBase[i] *= ratio ** -1;
    }
  }
  cloneBase.sort();
  const roundedBase = Math.round(
    (target / cloneBase.length - Math.floor(target / cloneBase.length)) *
      cloneBase.length,
  );

  return Math.round(
    ratio ** Math.floor(target / cloneBase.length) * cloneBase[roundedBase],
  );
};

/**
 * @param {number} target
 * @param {array<object>} breakpoints
 * @param {string} breakpointName
 * @return {number}
 */
const calcFontSize = (target, breakpoints, breakpointName) => {
  let result = null;
  if (breakpointName === undefined) {
    const breakpoint = breakpoints.find(b => /^0/.test(b.value));
    const base = getBase(breakpoint.base);
    const { ratio, root } = breakpoint;
    result = calculator(target, base, ratio);

    return `${toRem(result, root)}rem`;
  }

  const breakpoint = breakpoints.find(b => b.name === breakpointName);
  const { base, ratio, root } = breakpoint;
  result = calculator(target, base, ratio);

  return `${toRem(result, root)}rem`;
};

module.exports = {
  calculator,
  calcFontSize,
};
