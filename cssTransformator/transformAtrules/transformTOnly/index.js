const { camelize, decamelize } = require('humps');
const { isArray } = require('../../../helpers');
const {
  breakpointsToCebabCase,
  calcBreakpointOnly,
  checkIsBreakpointName,
  getNamesOfBreakpoints,
  removeRoundBrackets,
} = require('../../../utils/breakpoints');

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

module.exports = (node, config) => {
  const postcssAtrule = node;
  postcssAtrule.name = 'media';
  postcssAtrule.params = calcParamsOfAtruleAbove(node, config);
};

module.exports.test = atrule => atrule.name === 't-only';
