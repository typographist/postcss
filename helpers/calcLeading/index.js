/**
 * @param {number|array<number>} base
 * @param {number} lineHeight
 * @return {number}
 */
module.exports = (base, lineHeight) => {
  if (Array.isArray(base)) {
    return Math.round(base[0] * lineHeight);
  }

  return Math.round(base * lineHeight);
};
