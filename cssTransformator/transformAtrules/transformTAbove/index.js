const { camelize } = require('humps');
const makeBreakpointsModel = require('../../../utils/makeBreakpointsModel/');
const { HAS_EM, HAS_PX } = require('../../../constants/regexes');
const {
  checkIsBreakpointName,
  getNamesOfBreakpoints,
  removeBrackets,
  getBreakpointsList,
} = require('../../helpers');
const { toEm } = require('../../../helpers');

const getTAboveOrTBelowParams = (node, config) => {
  const postcssNode = node;
  const breakpoints = makeBreakpointsModel(config);
  const namesOfBreakpoints = getNamesOfBreakpoints(
    makeBreakpointsModel,
    config,
  );
  const atruleRawValue = camelize(removeBrackets(postcssNode.params));
  const isBreakpointName = checkIsBreakpointName(
    namesOfBreakpoints,
    atruleRawValue,
  );

  const isTAbove = postcssNode.name === 't-above';
  const breakpointProp = isTAbove ? 'min-width' : 'max-width';
  const atruleName = isTAbove ? '@t-above' : '@t-below';
  let result = null;

  try {
    if (isBreakpointName) {
      const breakpoint = breakpoints.find(b => b.name === atruleRawValue);
      const breakpointValue = `${toEm(breakpoint.value)}em`;

      result = `screen and (${breakpointProp}: ${breakpointValue})`;
    } else if (HAS_PX.test(atruleRawValue)) {
      const breakpointValue = `${toEm(atruleRawValue)}em`;
      result = `screen and (${breakpointProp}: ${breakpointValue})`;
    } else if (HAS_EM.test(atruleRawValue)) {
      result = `screen and (${breakpointProp}: ${atruleRawValue})`;
    } else {
      postcssNode.remove();

      const breakpointsList = getBreakpointsList(namesOfBreakpoints);
      const rawValue = removeBrackets(postcssNode.params);
      throw new Error(`
          ${rawValue} is invalid argument in ${atruleName} function!
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
  postcssNode.params = getTAboveOrTBelowParams(node, config);
};

module.exports.test = node => {
  const { type, name } = node;
  const isAtrule = type === 'atrule';
  const isTAbove = name === 't-above';
  const isTBelow = name === 't-below';

  return [isAtrule, isTAbove || isTBelow].every(Boolean);
};
