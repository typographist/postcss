const transformStepUnit = require('./transformStepUnit');
const transformTStepFunction = require('./transformTStepFunction');

export const transformDecls = (decl, config) => {
  if (transformStepUnit.test(decl)) {
    transformStepUnit(decl, config);
  }

  if (transformTStepFunction.test(decl)) {
    transformTStepFunction(decl, config);
  }
};
