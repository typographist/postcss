const { camelize, decamelize } = require('humps');
const { toEm } = require('../../../helpers');
const { HAS_EM, HAS_PX } = require('../../../constants/regexes');
const {
  breakpointsToCebabCase,
  calcBreakpointAbove,
  checkIsBreakpointName,
  getNamesOfBreakpoints,
  removeRoundBrackets,
} = require('../../../api/breakpoints');

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
      result = '';
      postcssAtrule.remove();
      const breakpointLine = breakpointsToCebabCase(namesOfBreakpoints);
      const valueWithoutBrackets = removeRoundBrackets(postcssAtrule.params);
      const exampleBreak = decamelize(namesOfBreakpoints[2], {
        separator: '-',
      });
      throw new Error(
        `
          "${valueWithoutBrackets}" is invalid argument of @t-above. Use "${breakpointLine}" or the value in pixels or in ems. 
          For example @t-above(${exampleBreak}) or @t-above(800px) or @t-above(40em).
        `,
      );
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
