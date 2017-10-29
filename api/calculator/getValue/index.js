const CONTAINS_EM = require('../../../regex').CONTAINS_EM;
const toPx = require('../../../helpers/toPx');

const getValue = (val) => {
  if (CONTAINS_EM.test(val)) {
    return toPx(val);
  }

  return val;
};

module.exports = getValue;
