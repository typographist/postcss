const isArray = require('../isArray');
const toPx = require('../toPx');
const { HAS_PX, HAS_EM } = require('../../constants/regexes');

/**
 * @param {Array<string>|string} base
 * @return {Array<number>|number}
 */
const stripUnit = val => {
  let result;

  if (isArray(val)) {
    result = val.map(item => stripUnit(item));
  } else if (typeof val === 'string') {
    if (HAS_PX.test(val)) {
      result = parseFloat(val);
    }

    if (HAS_EM.test(val)) {
      result = toPx(val);
    }
  }

  return result;
};

module.exports = stripUnit;
