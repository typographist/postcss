const isArray = require('../../helpers/isArray');

/**
 * @param {Array<number>|number} base
 * @return {number}
 */

const getFirstBase = (base) => {
  if (isArray(base)) {
    return base[0];
  }

  return base;
};

module.exports = getFirstBase;
