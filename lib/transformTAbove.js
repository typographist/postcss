const { camelize } = require('humps');
const store = require('../api/store');
const { CONTAINS_EM, CONTAINS_PX } = require('./constants');
const {
  checkIsBreakpointName,
  getBreakpointsNames,
  removeBrackets,
  getBreakpointsList,
} = require('./helpers');
const { toEm } = require('../helpers');

module.exports = (node, config) => {
  const postcssNode = node;
  const breakpoints = store(config);
  const breakpointsNames = getBreakpointsNames(store, config);
  const atruleRawValue = camelize(removeBrackets(postcssNode.params));
  const isBreakpointName = checkIsBreakpointName(
    breakpointsNames,
    atruleRawValue,
  );

  const isTAbove = postcssNode.name === 't-above';
  const breakpointProp = isTAbove ? 'min-width' : 'max-width';
  const functionName = isTAbove ? '@t-above' : '@t-below';

  postcssNode.name = 'media';

  try {
    if (isBreakpointName) {
      const breakpoint = breakpoints.find(b => b.name === atruleRawValue);
      const breakpointValue = `${toEm(parseFloat(breakpoint.value))}em`;

      postcssNode.params = `screen and (${breakpointProp}: ${breakpointValue})`;
    } else if (CONTAINS_PX.test(atruleRawValue)) {
      const breakpointValue = `${toEm(parseFloat(atruleRawValue))}em`;
      postcssNode.params = `screen and (${breakpointProp}: ${breakpointValue})`;
    } else if (CONTAINS_EM.test(atruleRawValue)) {
      postcssNode.params = `screen and (${breakpointProp}: ${atruleRawValue})`;
    } else {
      postcssNode.remove();

      const breakpointsList = getBreakpointsList(breakpointsNames);
      const rawValue = removeBrackets(postcssNode.params);
      throw new Error(
        `
          ${rawValue} is invalid argument in ${functionName} function!
          Use ${breakpointsList} or the value in pixels or in ems.
        `,
      );
    }
  } catch (err) {
    console.warn(err.message);
  }
};

module.exports.test = node => {
  const isAtrule = node.type === 'atrule';
  const isTAbove = node.name === 't-above';
  const isTBelow = node.name === 't-below';

  return [isAtrule, isTAbove || isTBelow].every(Boolean);
};
