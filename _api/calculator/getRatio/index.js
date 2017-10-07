import { CONTAINS_FONT_SIZE, CONTAINS_TARGET, CONTAINS_PX, CONTAINS_EM } from '../../regex';
import toPx from '../../helpers/toPx';
import getFirstBase from '../getFirstBase';

/**
 * @param {string} ratio 
 * @return {string}
 */
export const getFontSizeFromRatio = ratio => (
  ratio.match(CONTAINS_FONT_SIZE).toString()
);


/**
 * @param {string} ratio 
 * @return {number}
 */
export const getTargetFromRatio = ratio => (
  Number(ratio.match(CONTAINS_TARGET).toString())
);

/**
 * @param {number} fontSize 
 * @param {number} base 
 * @param {number} target
 * @return {number}
 */
export const calcRatio = (fontSize, base, target) => {
  const result = ((fontSize / base) ** (1 / target)).toFixed(5);

  return Number(result);
};

/**
 * 
 * @param {string|number} ratio 
 * @param {number} base 
 */
export const getRatio = (ratio, base) => {
  let result = null;

  if (typeof ratio === 'string') {
    let fontSize = getFontSizeFromRatio(ratio);
    const target = getTargetFromRatio(ratio);
    const firstBase = getFirstBase(base);

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
