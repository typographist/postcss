const { toPx } = require('../../../helpers');
const { HAS_EM } = require('../../../constants/regexes');

/**
 *
 */
const getValue = val => {
  if (HAS_EM.test(val)) {
    return toPx(val);
  }

  return val;
};

module.exports = getValue;
