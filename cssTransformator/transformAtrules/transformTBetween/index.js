const { HAS_EM, HAS_PX } = require('../../../constants/regexes');
const isInvalidBetweenFunction = require('./isInvalidBetweenFunction');
const { camelize } = require('humps');
const makeBreakpointsModel = require('../../../utils/makeBreakpointsModel');
const {
  checkIsBreakpointName,
  getBreakpointsList,
  getNamesOfBreakpoints,
  removeBrackets,
} = require('../../helpers');
const { toEm } = require('../../../helpers');

module.exports = (node, config) => {
  const postcssNode = node;
  const breakpoints = makeBreakpointsModel(config);
  const namesOfBreakpoints = getNamesOfBreakpoints(
    makeBreakpointsModel,
    config,
  );
  const breakpointsValues = removeBrackets(postcssNode.params)
    .split(', ')
    .map(item => camelize(item));

  const lowerBreakpoint = breakpointsValues[0];
  const upperBreakpoint = breakpointsValues[1];
  const breakpointsList = getBreakpointsList(namesOfBreakpoints);

  postcssNode.name = 'media';

  try {
    if (isInvalidBetweenFunction.test(node)) {
      postcssNode.remove();
      isInvalidBetweenFunction(postcssNode, lowerBreakpoint, breakpointsList);
    }

    if (checkIsBreakpointName(namesOfBreakpoints, lowerBreakpoint)) {
      if (checkIsBreakpointName(namesOfBreakpoints, upperBreakpoint)) {
        const getBreakpointCell = breakpointName =>
          breakpoints.find(item => item.name === breakpointName);

        const calcBreakpoint = breakpointName =>
          `${toEm(parseFloat(getBreakpointCell(breakpointName).value))}em`;

        const lowerBreak = calcBreakpoint(breakpointsValues[0]);
        const upperBreak = calcBreakpoint(breakpointsValues[1]);

        postcssNode.params = `screen and (min-width: ${lowerBreak}) and (max-width: ${upperBreak})`;
      } else {
        postcssNode.remove();
        throw new Error(`
            ${upperBreakpoint} is invalid second argument in @t-between function! Use ${breakpointsList}.
          `);
      }
    }

    if (HAS_PX.test(lowerBreakpoint)) {
      if (HAS_PX.test(upperBreakpoint)) {
        const calcBreakpoint = breakpointName =>
          `${toEm(parseFloat(breakpointName))}em`;

        const lowerBreak = calcBreakpoint(lowerBreakpoint);
        const upperBreak = calcBreakpoint(upperBreakpoint);

        postcssNode.params = `screen and (min-width: ${lowerBreak}) and (max-width: ${upperBreak})`;
      } else {
        postcssNode.remove();
        throw new Error(
          `
            ${upperBreakpoint} is invalid second argument in @t-between function!
            If the first argument of @t-between function has pixels,
            then the second argument must has pixels.
          `,
        );
      }
    }

    if (HAS_EM.test(lowerBreakpoint)) {
      if (HAS_EM.test(upperBreakpoint)) {
        postcssNode.params = `screen and (min-width: ${lowerBreakpoint}) and (max-width: ${upperBreakpoint})`;
      } else {
        postcssNode.remove();
        throw new Error(
          `
            ${upperBreakpoint} is invalid second argument in @t-between function!
            If the first argument of @t-between function has ems, then the second argument must has ems.
          `,
        );
      }
    }
  } catch (err) {
    console.warn(err.message);
  }
};

module.exports.test = node =>
  [node.type === 'atrule', node.name === 't-between'].every(Boolean);
