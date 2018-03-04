const postcss = require('postcss');

module.exports = () => {
  const rule = postcss.rule({
    selector: ':root',
  });

  return rule;
};
