const { getBase, toPx } = require('../../../helpers');
const {
  CONTAINS_FONT_SIZE,
  CONTAINS_TARGET,
  CONTAINS_PX,
  CONTAINS_EM,
} = require('../../../regex');

/**
 * @param {string} ratio
 * @return {string}
 */
const getFontSizeFromRatio = ratio =>
  ratio.match(CONTAINS_FONT_SIZE).toString();

/**
 * @param {string} ratio
 * @return {number}
 */
const getTargetFromRatio = ratio =>
  Number(ratio.match(CONTAINS_TARGET).toString());

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

    if (CONTAINS_PX.test(fontSize)) {
      fontSize = parseFloat(fontSize);
    }

    if (CONTAINS_EM.test(fontSize)) {
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
