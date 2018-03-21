const postcss = require('postcss');

module.exports = parent => {
  const rule = postcss.rule({
    selector: parent.selector,
  });

  return rule;
};
