const { cleanNode, transformAfterNodes } = require('../helpers');

// isBubblingRule :: Object -> Boolean
exports.isBubblingRule = ({ parent, selector }) =>
  parent && parent.type === 'rule' && !isNestedSelector(selector);

// bubblingRule :: Object -> Void
exports.bubblingRule = (rule) => {
  cleanNode(rule);
  transformAfterNodes(rule);
  rule.selector = `${rule.parent.selector} ${rule.selector}`;
  const parent = rule.parent.after(rule);
  cleanNode(rule);

  if (!parent.nodes.length) parent.remove();
};

// isNestedSelector :: String -> Boolean
function isNestedSelector(selector) {
  return /&/.test(selector);
}
