const { getBase, toPx } = require('../../../helpers');
const {
  HAS_FONT_SIZE_VAL,
  HAS_TARGET,
  HAS_PX,
  HAS_EM,
} = require('../../../constants/regexes');

/**
 * @param {string} ratio
 * @return {string}
 */
const getFontSizeFromRatio = ratio => ratio.match(HAS_FONT_SIZE_VAL).toString();

/**
 * @param {string} ratio
 * @return {number}
 */
const getTargetFromRatio = ratio => Number(ratio.match(HAS_TARGET).toString());

/**
 * @param {number} fontSize
 * @param {number} base
 * @param {number} target
 * @return {number}
 */
const calcRatio = (fontSize, base, target) => (fontSize / base) ** (1 / target);

/**
 *
 * @param {string|number} ratio
 * @param {number} base
 */
const getRatio = (ratio, base) => {
  let result = null;

  if (typeof ratio === 'string') {
    let fontSize = getFontSizeFromRatio(ratio);
    const target = getTargetFromRatio(ratio);
    const firstBase = getBase(base);

    if (HAS_PX.test(fontSize)) {
      fontSize = parseFloat(fontSize);
    }

    if (HAS_EM.test(fontSize)) {
      fontSize = toPx(fontSize);
    }

    result = calcRatio(fontSize, firstBase, target);
  }

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
