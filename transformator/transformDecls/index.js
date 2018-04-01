const transformStepUnit = require('./transformStepUnit');
const transformTStepFunction = require('./transformTStepFunction');

/**
 * Processing css declarations depending on the given conditions.
 * @param {Object} decl Css declaration.
 * @param {Object} config User configuration.
 * @return {void}
 */
module.exports = (decl, config) => {
  if (transformStepUnit.test(decl)) {
    transformStepUnit(decl, config);
  }

  if (transformTStepFunction.test(decl)) {
    transformTStepFunction(decl, config);
  }
};
