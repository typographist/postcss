const toPx = require('../../../helpers/toPx');
const { CONTAINS_EM } = require('../../../regex');


/**
 * 
 */
const getValue = (val) => {
  if (CONTAINS_EM.test(val)) {
    return toPx(val);
  }

  return val;
};

module.exports = getValue;
