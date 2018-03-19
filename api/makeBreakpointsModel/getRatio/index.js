const { getBase, toPx } = require('../../../helpers');
const {
  HAS_FONT_SIZE_VAL,
  HAS_TARGET,
  HAS_PX,
  HAS_EM,
} = require('../../../constants/regexes');

/**
 * Retrieving the font-size from the ratio specified in the custom configuration.
 * @param {string} ratio Ratio from user configuration.
 * @return {string} String containing font-size.
 */
const getFontSizeFromRatio = ratio => ratio.match(HAS_FONT_SIZE_VAL).toString();

/**
 * @param {string} ratio Ratio from user configuration.
 * @return {number} Position in the modular scale. Counting starts from scratch.
 */
const getTargetFromRatio = ratio => Number(ratio.match(HAS_TARGET).toString());

/**
 * @param {number} fontSize Font size value.
 * @param {number} base Base value
 * @param {number} target Position in the modular scale.
 * @return {number} calculated ratio.
 */
const calcRatio = (fontSize, base, target) => (fontSize / base) ** (1 / target);

/**
 *
 * @param {string|number} ratio Ratio from user configuration.
 * @param {number} base Base.
 * @return {number} calculated ratio.
 */
const getRatio = (ratio, base) => {
  let result = null;

  // If ratio is string.
  if (typeof ratio === 'string') {
    let fontSize = getFontSizeFromRatio(ratio);
    const target = getTargetFromRatio(ratio);
    const firstBase = getBase(base);

    if (HAS_PX.test(fontSize)) {
      fontSize = parseFloat(fontSize);
    } else if (HAS_EM.test(fontSize)) {
      fontSize = toPx(fontSize);
    }

    result = calcRatio(fontSize, firstBase, target);
  }

  // If ratio is number.
  if (typeof ratio === 'number') {
    result = ratio;
  }

  return result;
};

module.exports = {
  getFontSizeFromRatio,
  getTargetFromRatio,
  calcRatio,
  getRatio,
};
