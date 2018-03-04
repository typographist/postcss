const { calcLeading, calcRoot } = require('../../helpers');

/**
 * @param {array<object>} breakpoints
 * @return {array<object>}
 */
const setRootSize = breakpoints =>
  breakpoints.map(item => {
    const leading = calcLeading(item.base, item.lineHeight);

    return {
      ...item,
      root: calcRoot(leading),
    };
  });

module.exports = setRootSize;
