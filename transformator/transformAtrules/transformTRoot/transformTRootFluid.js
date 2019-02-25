const { ALL_ROUND_BRACKETS } = require('@typographist/core/constants');
const { getFirstBreakpoint } = require('@typographist/core/api');
const { percentage, toEm } = require('@typographist/core/helpers');
const { mediaAtrule } = require('../../atrules');
const { variableDecl, fontSizeDecl } = require('../../decls');
const getRootRule = require('./getRootRule');

/**
 * The function replaces @t-root(fluid) with the liquid font size for each breakpoint.
 *
 * @param {Object} atrule @t-root(fluid)
 * @param {Array<Object>} breakpoints Array of breakpoint objects.
 * @return {void}
 */
module.exports = (atrule, breakpoints) => {
  const { parent } = atrule;
  const firstBreakpoint = getFirstBreakpoint(breakpoints);

  breakpoints
    .filter((b) => b.value !== '0px')
    .reverse()
    .map((b, index) => {
      const calcFontSizeFluid = (i) => {
        let result = null;
        const breakpointsValues = breakpoints
          .filter((breakpoint) => breakpoint.value !== '0px')
          .map((breakpoint) => breakpoint.value);
        const rootValues = breakpoints.map((breakpoint) => breakpoint.root);
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

  breakpoints
    .filter((b) => b.value !== '0px')
    .map((b) =>
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

/**
 * Check if the @ t-root parameters contain the value "fluid".
 * Check is "root" the parent selector.
 * If yes, return "true" if not, warn the user about the error.
 *
 * @param {Object} atrule Css atrule.
 * @return {boolean} Contains "fluid" or not.
 */
module.exports.test = (atrule) => {
  const { parent, params } = atrule;
  const isRootRule = parent.selector === ':root';
  const hasFluid = params.replace(ALL_ROUND_BRACKETS, '') === 'fluid';
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
          \`${params.replace(
            ALL_ROUND_BRACKETS,
            '',
          )}\` is incorrect value of @t-root. Use @t-root(fluid).
          `,
        );
      }
    } catch (err) {
      console.warn(err.message);
    }
  }

  return result;
};
