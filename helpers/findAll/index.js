const isObject = require('../isObject/');
const isArray = require('../isArray/');

const findAll = (obj, key, memo) => {
  let result = memo;
  if (!isArray(memo)) result = [];

  /* eslint-disable no-restricted-syntax */
  for (const i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      if (i === key) {
        result.push(obj[i]);
      } else if (isArray(obj[i]) || isObject(obj[i])) {
        findAll(obj[i], key, result);
      }
    }
  }

  return result;
};
/* eslint-enable */

module.exports = findAll;
