/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
const { percentage, toEm } = require('@typographist/core');

const { mediaQuery, fontSizeProp } = require('../elements');
const { makeRootProp, cssVariable } = require('./elements');

// isFluidRoot :: Object -> Boolean
exports.isFluidRoot = ({ parent, params }) =>
  parent && /:root|html/.test(parent.selector) && params === '(fluid)';

// defaultRoot :: (Object, Object) -> Void
exports.fluidRoot = (atrule, breakpointsMap) => {
  const { initial: firstBreakpoint, ...breaks } = breakpointsMap;

  addRootSizeForEachBreakpoints(atrule, Object.values(breakpointsMap));
  addCssVariables(atrule, breaks);
  const fontSize = percentage(firstBreakpoint.root);
  atrule.replaceWith(fontSizeProp(fontSize));
};

// addRootSizeForEachBreakpoints :: (Object, [Object]) -> Void
function addRootSizeForEachBreakpoints(atrule, breaks) {
  breaks.reverse().map((_, index) => {
    const nextIndex = index + 1;
    const prevIndex = index - 1;

    if (index !== 0 && breaks[nextIndex]) {
      const currentRoot = breaks[index].root;
      const prevRoot = breaks[nextIndex].root;
      const rootDiff = currentRoot - prevRoot;

      const nextBreak = parseFloat(breaks[prevIndex].value);
      const currentBreak = parseFloat(breaks[index].value);
      const breaksDiff = nextBreak - currentBreak;
      const root = percentage(prevRoot);
      const breakpoint = toEm(currentBreak);

      const fontSize = fontSizeProp(
        `calc(${root} + ${rootDiff} * ((100vw - ${breakpoint}) / ${breaksDiff}))`,
      );
      const rootSelector = makeRootProp(atrule.parent).append(fontSize);

      return atrule.parent.after(
        mediaQuery(breaks[index].value).append(rootSelector),
      );
    }

    if (index === 0) {
      const root = percentage(breaks[index].root);
      const fontSize = fontSizeProp(root);
      const rootSelector = makeRootProp(atrule.parent).append(fontSize);

      return atrule.parent.after(
        mediaQuery(breaks[index].value).append(rootSelector),
      );
    }
  });
}

// addCssVariables :: (Object, Object) -> [Object]
function addCssVariables(atrule, breakpoints) {
  return Object.keys(breakpoints).map((key) =>
    atrule.before(cssVariable(key, breakpoints[key].value)),
  );
}
