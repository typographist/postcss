const { camelize } = require('humps');
const { isArray } = require('../../../helpers');
const {
  breakpointsToCebabCase,
  calcBreakpointOnly,
  checkIsBreakpointName,
  getNamesOfBreakpoints,
  removeRoundBrackets,
} = require('../../../utils/breakpoints');

const calcParamsOfAtruleAbove = (node, config) => {
  const postcssNode = node;
  const namesOfBreakpoints = getNamesOfBreakpoints(config);
  const paramWithoutBrackets = camelize(
    removeRoundBrackets(postcssNode.params),
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
      postcssNode.remove();

      const breakpointsList = breakpointsToCebabCase(namesOfBreakpoints);
      const valueWithoutBrackets = removeRoundBrackets(postcssNode.params);
      throw new Error(
        `
          ${valueWithoutBrackets} is incorrect parameter in @t-only.
          Use ${breakpointsList}.
        `,
      );
    }
  } catch (err) {
    console.warn(err.message);
  }
  return result;
};

module.exports = (node, config) => {
  const postcssNode = node;
  postcssNode.name = 'media';
  postcssNode.params = calcParamsOfAtruleAbove(node, config);
};

module.exports.test = node => {
  const { type, name } = node;
  const isAtrule = type === 'atrule';
  const isTOnly = name === 't-only';

  return [isAtrule, isTOnly].every(Boolean);
};
