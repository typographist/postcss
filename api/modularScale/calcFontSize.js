const { isArray } = require('../../helpers');

/**
 * @param {number} target
 * @param {number} base
 * @param {number} ratio
 * @return {number} Font size in pixels
 */

module.exports = (target, base, ratio) => {
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
