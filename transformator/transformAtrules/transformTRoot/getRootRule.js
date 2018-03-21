const postcss = require('postcss');

/**
 * Create css selector
 */
module.exports = () => {
  const rule = postcss.rule({
    selector: ':root',
  });

  return rule;
};
