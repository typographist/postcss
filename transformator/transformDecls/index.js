const transformMsUnit = require('./transformMsUnit');
const transformTMsFunction = require('./transformTMsFunction');

module.exports = (decl, config) => {
  if (transformMsUnit.test(decl)) {
    transformMsUnit(decl, config);
  }

  if (transformTMsFunction.test(decl)) {
    transformTMsFunction(decl, config);
  }
};
