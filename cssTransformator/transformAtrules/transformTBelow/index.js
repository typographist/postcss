const { camelize, decamelize } = require('humps');
const { toEm } = require('../../../helpers');
const { HAS_EM, HAS_PX } = require('../../../constants/regexes');
const {
  calcBreakpointBelow,
  checkIsBreakpointName,
  getNamesOfBreakpoints,
  removeRoundBrackets,
} = require('../../../utils/breakpoints');

const calcParamsOfAtruleBelow = (node, config) => {
  const postcssNode = node;
  const namesOfBreakpoints = getNamesOfBreakpoints(config);
  const paramsWithoutBrackets = removeRoundBrackets(postcssNode.params);
  const isBreakpointName = checkIsBreakpointName(
    namesOfBreakpoints,
    camelize(paramsWithoutBrackets),
  );

  let result = null;

  try {
    if (isBreakpointName) {
      if (calcBreakpointBelow(paramsWithoutBrackets, config)) {
        result = `screen and (max-width: ${calcBreakpointBelow(
          paramsWithoutBrackets,
          config,
        )})`;
      } else {
        postcssNode.remove();
        const penultimateBreakName = namesOfBreakpoints
          .map(item => decamelize(item, { separator: '-' }))
          .filter((item, i, arr) => item === arr[arr.length - 2]);
        throw new Error(`
          ${paramsWithoutBrackets} is incorrect parameter in @t-below. Use ${penultimateBreakName} as a maximum breakpoint.
          `);
      }
    } else if (HAS_PX.test(paramsWithoutBrackets)) {
      const breakpointValue = `${toEm(paramsWithoutBrackets)}em`;
      result = `screen and (max-width: ${breakpointValue})`;
    } else if (HAS_EM.test(paramsWithoutBrackets)) {
      result = `screen and (max-width: ${paramsWithoutBrackets})`;
    } else {
      postcssNode.remove();

      // Without the last value.
      const breakpointsList = namesOfBreakpoints
        .map(item => decamelize(item, { separator: '-' }))
        .filter((item, i, arr) => item !== arr[arr.length - 1])
        .join(', ');

      const valueWithoutBrackets = removeRoundBrackets(postcssNode.params);
      throw new Error(`
          ${valueWithoutBrackets} is incorrect parameter in @t-below.
          Use ${breakpointsList} or the value in pixels or in ems.
        `);
    }
  } catch (err) {
    console.warn(err.message);
  }

  return result;
};

module.exports = (node, config) => {
  const postcssNode = node;
  postcssNode.name = 'media';
  postcssNode.params = calcParamsOfAtruleBelow(node, config);
};

module.exports.test = node =>
  [node.type === 'atrule', node.name === 't-below'].every(Boolean);
