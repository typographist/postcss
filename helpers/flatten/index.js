const isArray = require('../isArray');

module.exports = arrayOfArrays => arrayOfArrays.reduce((acc, current) => {
  let result = null;
  if (!isArray(current)) {
    result = [...acc, current];
  } else {
    result = [...acc, ...current];
  }

  return result;
}, []);