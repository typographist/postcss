import calcLeading from '../../helpers/calcLeading';
import calcRoot from '../../helpers/calcRoot';

/**
 * 
 * @param {array<object>} breakpoints
 * @return {array<object>}
 */
const setRootSize = breakpoints => (
  breakpoints.map((item) => {
    const leading = calcLeading(item.base, item.lineHeight);

    return {
      ...item,
      root: calcRoot(leading),
    };
  })
);

export default setRootSize;
