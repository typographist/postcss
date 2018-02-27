const { camelize } = require('humps');
const store = require('../api/store');
const { CONTAINS_EM, CONTAINS_PX } = require('./constants');
const {
  checkIsBreakpointName,
  getBreakpointsList,
  getBreakpointsNames,
  removeBrackets,
} = require('./helpers');
const { toEm } = require('../helpers');

module.exports = (node, config) => {
  const postcssNode = node;
  const breakpoints = store(config);
  const breakpointsNames = getBreakpointsNames(store, config);
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
        !CONTAINS_PX.test(lowerBreakpoint),
        !CONTAINS_EM.test(lowerBreakpoint),
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

    if (CONTAINS_PX.test(lowerBreakpoint)) {
      if (CONTAINS_PX.test(upperBreakpoint)) {
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
            If the first argument breakpoint contains pixels,
            then the second argument must contain pixels.
          `,
        );
      }
    }

    if (CONTAINS_EM.test(lowerBreakpoint)) {
      if (CONTAINS_EM.test(upperBreakpoint)) {
        postcssNode.params = `screen and (min-width: ${lowerBreakpoint}) and (max-width: ${upperBreakpoint})`;
      } else {
        postcssNode.remove();
        throw new Error(
          `
            ${upperBreakpoint} is invalid second argument in @t-between function!
            If the first argument breakpoint contains ems, then the second argument must contain ems.
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
