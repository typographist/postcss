const { camelize } = require('humps');
const { toEm } = require('../../../helpers');
const { HAS_EM, HAS_PX } = require('../../../constants/regexes');
const {
  breakpointsToCebabCase,
  calcBreakpointAbove,
  checkIsBreakpointName,
  getNamesOfBreakpoints,
  removeRoundBrackets,
} = require('../../../utils/breakpoints');

const calcParamsOfAtruleAbove = (node, config) => {
  const postcssNode = node;
  const namesOfBreakpoints = getNamesOfBreakpoints(config);
  const paramsWithoutBrackets = camelize(
    removeRoundBrackets(postcssNode.params),
  );
  const isBreakpointName = checkIsBreakpointName(
    namesOfBreakpoints,
    paramsWithoutBrackets,
  );
  let result = null;

  try {
    if (isBreakpointName) {
      result = `screen and (min-width: ${calcBreakpointAbove(
        paramsWithoutBrackets,
        config,
      )})`;
    } else if (HAS_PX.test(paramsWithoutBrackets)) {
      const breakpointValue = `${toEm(paramsWithoutBrackets)}em`;
      result = `screen and (min-width: ${breakpointValue})`;
    } else if (HAS_EM.test(paramsWithoutBrackets)) {
      result = `screen and (min-width: ${paramsWithoutBrackets})`;
    } else {
      postcssNode.remove();
      const breakpointsList = breakpointsToCebabCase(namesOfBreakpoints);
      const valueWithoutBrackets = removeRoundBrackets(postcssNode.params);
      throw new Error(
        `
          ${valueWithoutBrackets} is invalid argument in @t-above function!
          Use ${breakpointsList} or the value in pixels or in ems.
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
  const isTAbove = name === 't-above';

  return [isAtrule, isTAbove].every(Boolean);
};
