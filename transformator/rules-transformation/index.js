const bubblingRule = require('./bubblingRule');
const nestedRule = require('./nestedRule');

export const transformRules = (rule) => {
  if (bubblingRule.test(rule)) {
    bubblingRule(rule);
  }

  if (nestedRule.test(rule)) {
    nestedRule(rule);
  }
};
