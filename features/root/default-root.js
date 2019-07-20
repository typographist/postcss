const { percentage } = require('@typographist/core');
const { mediaQuery, fontSizeProp } = require('../elements');
const { rootProp, cssVariable } = require('./elements');

// isDefaultRoot :: Object -> Boolean
exports.isDefaultRoot = ({ parent, params }) =>
  parent && parent.selector === ':root' && params === '';

// defaultRoot :: (Object, Object) -> Void
exports.defaultRoot = (atrule, breakpointsMap) => {
  const { initial: firstBreakpoint, ...breaks } = breakpointsMap;
  const breakpoints = Object.values(breaks);

  addRootSizesForEachBreaks(atrule, breakpoints);
  addCssVariables(atrule, breaks);
  const fontSize = percentage(firstBreakpoint.root);
  atrule.replaceWith(fontSizeProp(fontSize));
};

// addCssVariables :: (Object, Object) -> [Object]
function addCssVariables(atrule, breakpoints) {
  return Object.keys(breakpoints).map((key) =>
    atrule.before(cssVariable(key, breakpoints[key].value)),
  );
}

// addRootSizesForEachBreaks :: (Object, [Object]) -> Void
function addRootSizesForEachBreaks(atrule, breaks) {
  breaks.reverse().map(({ root, value }) => {
    const fontSize = fontSizeProp(percentage(root));
    const rootSelector = rootProp().append(fontSize);

    return atrule.parent.after(mediaQuery(value).append(rootSelector));
  });
}
