const { camelize, decamelize } = require('humps');
const { isArray } = require('../../../helpers');
const {
  breakpointsToCebabCase,
  calcBreakpointOnly,
  checkIsBreakpointName,
  getNamesOfBreakpoints,
  removeRoundBrackets,
} = require('../../../api/breakpoints');

/**
 * !!! @t-only accepts only the names of breakpoints.
 *
 * If @t-only contains the breakpoint name, then convert it to em
 * if it contains the last value of the breakpoint or contains any values other than the breakpoint names,
 *
 * delete @t-only and warn the user about the error.
 * @example @t-only(tablet) => @media screen and (min-width: 36em) and (max-width: 47.99875em)
 * @param {Object} atrule @t-only atrule.
 * @param {Object} config User configuration.
 */
const calcParamsOfAtruleAbove = (atrule, config) => {
  const postcssAtrule = atrule;
  const namesOfBreakpoints = getNamesOfBreakpoints(config);
  const paramWithoutBrackets = camelize(
    removeRoundBrackets(postcssAtrule.params),
  );
  const isBreakpointName = checkIsBreakpointName(
    namesOfBreakpoints,
    paramWithoutBrackets,
  );

  let result = null;

  try {
    if (isBreakpointName) {
      const breakValue = calcBreakpointOnly(paramWithoutBrackets, config);

      // is not last breakpoint name in user configuration.
      if (isArray(breakValue)) {
        const [lowerBreak, upperBreak] = breakValue;

        result = `screen and (min-width: ${lowerBreak}) and (max-width: ${upperBreak})`;
        // if last breakpoint name in user configuration.
      } else if (typeof breakValue === 'string') {
        result = `screen and (min-width: ${breakValue})`;
      }
    } else {
      result = '';
      postcssAtrule.remove();

      const breakpointLine = breakpointsToCebabCase(namesOfBreakpoints);
      const valueWithoutBrackets = removeRoundBrackets(postcssAtrule.params);
      const exampleBreak = decamelize(namesOfBreakpoints[2], {
        separator: '-',
      });

      throw new Error(
        `
          "${valueWithoutBrackets}" is incorrect parameter of @t-only. Use ${breakpointLine}.
          For example @t-only(${exampleBreak}).
        `,
      );
    }
  } catch (err) {
    console.warn(err.message);
  }
  return result;
};

/**
 * Replaced @t-only Replacement @t-only(breakpoint name) with @media screen and (min-width: "blablabla") and (max-width: "blablabla")
 * @example @-only(tablet) => @media screen and (min-width: 36em) and (max-width: 47.99875em)
 * @param {Object} node Css node.
 * @param {Object} config User configuration.
 */
module.exports = (node, config) => {
  const postcssAtrule = node;
  postcssAtrule.name = 'media';
  postcssAtrule.params = calcParamsOfAtruleAbove(node, config);
};

/**
 * Check atrule name have a @t-only value.
 * @param {Object} atrule Css atrule.
 * @return {boolean} Contains @t-only or not.
 */
module.exports.test = atrule => atrule.name === 't-only';
