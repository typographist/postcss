const { cleanNode, transformAfterNodes } = require('../helpers');

const LAST_COMMA = /,\s*$/;
const LINE_BREAKS_AND_SPACES = /[\n\s]/g;
const COMMA_AND_NEW_LINE = ',\n';

// isNestedRule :: Object -> Boolean
exports.isNestedRule = ({ parent, selector }) =>
  parent && parent.type === 'rule' && isNestedSelector(selector);

// nestedRule :: Object -> Void
exports.nestedRule = (rule) => {
  cleanNode(rule);
  transformAfterNodes(rule);
  rule.nodes.map(cleanNode);
  const selectorName = makeNestedSelectorNames(rule);

  rule.selector = replaceLastComma(selectorName);
  rule.parent.selector = replaceLastComma(rule.parent.selector);

  rule.parent.after(rule);
  cleanNode(rule);

  if (!rule.nodes.length) {
    rule.remove();
  }
};

// makeNestedSelectorName :: Object -> String
function makeNestedSelectorNames(rule) {
  const parentSelectors = getRawRules(rule.parent.selector);
  const nestedSelectors = getRawRules(rule.selector);

  let selectorName = '';
  for (let i = 0; i < parentSelectors.length; i += 1) {
    for (let j = 0; j < nestedSelectors.length; j += 1) {
      selectorName +=
        makeSelectorName(nestedSelectors[j], parentSelectors[i]) +
        COMMA_AND_NEW_LINE;
    }
  }

  return selectorName;
}

// makeSelectorName :: (String, String) -> String
function makeSelectorName(replaceable, replacer) {
  return replaceable.replace(/&/, replacer);
}

// getRawRules :: String -> [String]
function getRawRules(rule) {
  return rule
    .replace(LAST_COMMA, '')
    .replace(LINE_BREAKS_AND_SPACES, '')
    .split(',');
}

// isNestedSelector :: String -> Boolean
function isNestedSelector(selector) {
  return /&/.test(selector);
}

// replaceLastComma :: String -> String
function replaceLastComma(selector) {
  return selector.replace(LAST_COMMA, '');
}
