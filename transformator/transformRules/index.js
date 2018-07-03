const bubblingRule = require('./bubblingRule');
const nestedRule = require('./nestedRule');

/**
 * Processing css rules depending on the conditions.
 * @param {Object} rule Css rule.
 * @return {void}
 */
module.exports = rule => {
  if (bubblingRule.test(rule)) {
    bubblingRule(rule);
  }

  if (nestedRule.test(rule)) {
    nestedRule(rule);
  }
};
