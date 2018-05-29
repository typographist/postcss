const cleanNode = require('../utils/cleanNode');
const transformAfterNodes = require('../utils/transformAfterNodes');

module.exports = rule => {
  const postcssRule = rule;
  cleanNode(rule);
  transformAfterNodes(rule);

  postcssRule.selector = `${rule.parent.selector} ${rule.selector}`;
  const parent = rule.parent.after(rule);
  cleanNode(rule);

  if (!parent.nodes.length) parent.remove();
};

module.exports.test = rule => {
  const { parent } = rule;
  const listOfParents = [':global', ':local'];

  return listOfParents.includes(parent.selector);
};
