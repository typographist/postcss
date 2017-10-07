import { BROWSER_DEFAULT_FONT_SIZE } from '../../constants';

/**
 * @param {string} ems
 * @return {number}   
 */
const toPx = ems => (
  parseFloat(ems) * BROWSER_DEFAULT_FONT_SIZE
);

export default toPx;
