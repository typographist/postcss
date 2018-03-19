const { mediaAtrule } = require('../../atrules');
const { variableDecl, fontSizeDecl } = require('../../decls');
const getRootRule = require('./getRootRule');
const { percentage, toEm } = require('../../../helpers');
const {
  getFirstBreakpoint,
  removeRoundBrackets,
} = require('../../../api/breakpoints');

module.exports = (atrule, breakpoints) => {
  const { parent } = atrule;
  const firstBreakpoint = getFirstBreakpoint(breakpoints);

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
    atrule.before(
      variableDecl({
        name: b.name,
        value: b.value,
      }),
    ),
  );
  const fontSize = `${percentage(firstBreakpoint.root)}%`;
  atrule.replaceWith(fontSizeDecl(fontSize));
};

module.exports.test = atrule => {
  const { parent, params } = atrule;
  const isRootRule = parent.selector === ':root';
  const hasFluid = removeRoundBrackets(params) === 'fluid';
  let result = null;

  if ([parent, isRootRule].every(Boolean)) {
    try {
      if (hasFluid) {
        result = true;
      } else {
        result = false;
        atrule.remove();
        throw new Error(
          `
          "${removeRoundBrackets(
            params,
          )}" is incorrect value of @t-root. Use @t-root(fluid).
          `,
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return result;
};
