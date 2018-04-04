const isArray = require('../isArray');

const flatten = arrayOfArrays =>
  arrayOfArrays.reduce(
    (acc, current) => acc.concat(isArray(current) ? flatten(current) : current),
    [],
  );

module.exports = flatten;
