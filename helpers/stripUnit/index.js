const isArray = require('../isArray/');
const regex = require('../../regex/');

const CONTAINS_PX = regex.CONTAINS_PX;
const CONTAINS_EM = regex.CONTAINS_EM;
const toPx = require('../toPx');

/**
 * @param {Array<string>|string} base
 * @return {Array<number>|number}
 */
const stripUnit = (val) => {
  let result;

  if (isArray(val)) {
    result = val.map(item => stripUnit(item));
  } else if (typeof val === 'string') {
    if (CONTAINS_PX.test(val)) {
      result = parseFloat(val);
    }

    if (CONTAINS_EM.test(val)) {
      result = toPx(val);
    }
  }

  return result;
};

module.exports = stripUnit;
