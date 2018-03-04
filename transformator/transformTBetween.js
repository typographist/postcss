const { camelize } = require('humps');
const makeBreakpointsModel = require('../makeBreakpointsModel');
const { HAS_EM, HAS_PX } = require('../constants/regexes');
const {
  checkIsBreakpointName,
  getBreakpointsList,
  getBreakpointsNames,
  removeBrackets,
} = require('./helpers');
const { toEm } = require('../helpers');

module.exports = (node, config) => {
  const postcssNode = node;
  const breakpoints = makeBreakpointsModel(config);
  const breakpointsNames = getBreakpointsNames(makeBreakpointsModel, config);
  const breakpointsValues = removeBrackets(postcssNode.params)
    .split(', ')
    .map(item => camelize(item));

  const lowerBreakpoint = breakpointsValues[0];
  const upperBreakpoint = breakpointsValues[1];
  const breakpointsList = getBreakpointsList(breakpointsNames);

  postcssNode.name = 'media';

  try {
    if (
      [
        !checkIsBreakpointName(breakpointsNames, lowerBreakpoint),
        !HAS_PX.test(lowerBreakpoint),
        !HAS_EM.test(lowerBreakpoint),
      ].every(Boolean)
    ) {
      postcssNode.remove();
      throw new Error(`
          ${lowerBreakpoint} is invalid first argument in @t-between function!
          Use ${breakpointsList} or the value in pixels or in ems.
        `);
    }

    if (checkIsBreakpointName(breakpointsNames, lowerBreakpoint)) {
      if (checkIsBreakpointName(breakpointsNames, upperBreakpoint)) {
        const getBreakpoint = breakpointName =>
          breakpoints.find(item => item.name === breakpointName);

        const calcBreakpoint = breakpointName =>
          `${toEm(parseFloat(getBreakpoint(breakpointName).value))}em`;

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
