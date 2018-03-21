const transformMsUnit = require('./transformMsUnit');
const transformTMsFunction = require('./transformTMsFunction');

/**
 * Processing css declarations depending on the given conditions.
 * @param {Object} decl Css declaration.
 * @param {Object} config User configuration.
 * @return {void}
 */
module.exports = (decl, config) => {
  if (transformMsUnit.test(decl)) {
    transformMsUnit(decl, config);
  }

  if (transformTMsFunction.test(decl)) {
    transformTMsFunction(decl, config);
  }
};
