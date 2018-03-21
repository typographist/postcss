const postcss = require('postcss');

/**
 * @param {string} parent Selector name.
 * @return {Object} Css rule with the specified name of the selector.
 */
module.exports = parent => {
  const rule = postcss.rule({
    selector: parent.selector,
  });

  return rule;
};
