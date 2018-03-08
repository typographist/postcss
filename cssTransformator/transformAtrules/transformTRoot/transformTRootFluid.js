const { mediaAtrule } = require('../../atrules');
const getRootRule = require('./getRootRule');
const { variableDecl, fontSizeDecl } = require('../../decls');
const { removeBrackets } = require();
const { percentage, toEm } = require('../../../helpers');

module.exports = (node, breakpoints) => {
  const { parent } = node;
  const defaultBreakpoint = breakpoints.find(b => /^0/.test(b.value));

  breakpoints
    .filter(b => b.value !== '0px')
    .reverse()
    .map((b, index) => {
      const calcFontSizeFluid = i => {
        let result = null;
        const breakpointsValues = breakpoints
          .filter(breakpoint => breakpoint.value !== '0px')
          .map(breakpoint => breakpoint.value);
        const rootValues = breakpoints.map(breakpoint => breakpoint.root);
        // remove second root
        rootValues.splice(1, 1);
        const currentPos = rootValues.length - i;
        // Enumerate the elements of the array from the end, since the css tree render is in the reverse order.
        if (rootValues[currentPos] && breakpointsValues[currentPos]) {
          const prevPos = currentPos - 1;
          const minRoot = rootValues[prevPos];
          const maxRoot = rootValues[currentPos];
          const rootsDiff = maxRoot - minRoot;
          const minBreakpoint = breakpointsValues[prevPos];
          const maxBreakpoint = breakpointsValues[currentPos];
          const calcBreakpointsDiff = () =>
            parseFloat(maxBreakpoint) - parseFloat(minBreakpoint);

          result = `calc(${percentage(
            minRoot,
          )}% + ${rootsDiff} * ((100vw - ${toEm(
            minBreakpoint,
          )}em) / ${calcBreakpointsDiff()}))`;
        } else {
          const lastRoot = rootValues.length - 1;
          result = `${percentage(rootValues[lastRoot])}%`;
        }
        return result;
      };

      return parent.after(
        mediaAtrule({
          minWidth: b.value,
          nestedRule: getRootRule().append(
            fontSizeDecl(calcFontSizeFluid(index)),
          ),
        }),
      );
    });

  breakpoints.filter(b => b.value !== '0px').map(b =>
    node.before(
      variableDecl({
        name: b.name,
        value: b.value,
      }),
    ),
  );
  const fontSize = `${percentage(defaultBreakpoint.root)}%`;
  node.replaceWith(fontSizeDecl(fontSize));
};

module.exports.test = node => {
  const { parent } = node;
  const isRootRule = parent.selector === ':root';
  const hasFluid = removeBrackets(node.params) === 'fluid';

  return [parent, isRootRule, hasFluid].every(Boolean);
};
