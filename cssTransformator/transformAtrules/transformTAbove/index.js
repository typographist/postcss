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

const calcParamsOfAtruleAbove = (atrule, config) => {
  const postcssAtrule = atrule;
  const namesOfBreakpoints = getNamesOfBreakpoints(config);
  const paramsWithoutBrackets = camelize(
    removeRoundBrackets(postcssAtrule.params),
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
      postcssAtrule.remove();
      const breakpointsList = breakpointsToCebabCase(namesOfBreakpoints);
      const valueWithoutBrackets = removeRoundBrackets(postcssAtrule.params);
      throw new Error(`
          ${valueWithoutBrackets} is invalid argument in @t-above function!
          Use ${breakpointsList} or the value in pixels or in ems.
        `);
    }
  } catch (err) {
    console.warn(err.message);
  }
  return result;
};

module.exports = (atrule, config) => {
  const postcssNode = atrule;
  postcssNode.name = 'media';
  postcssNode.params = calcParamsOfAtruleAbove(atrule, config);
};

module.exports.test = atrule => atrule.name === 't-above';
