import { BROWSER_DEFAULT_FONT_SIZE } from '../../constants';

/**
 * @param {string} val 
 * @return {number}
 */
const toEm = px => (
  parseFloat(px) / BROWSER_DEFAULT_FONT_SIZE
);

export default toEm;
