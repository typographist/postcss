const { camelize } = require('humps');
const { HAS_EM, HAS_PX } = require('../../../constants/regexes');
const isInvalidFirstParameter = require('./isInvalidFirstParameter');
const {
  breakpointsToCebabCase,
  calcBreakpointsBetween,
  checkIsBreakpointName,
  getNamesOfBreakpoints,
  removeRoundBrackets,
} = require('../../../utils/breakpoints');
const { isArray, toEm } = require('../../../helpers');

module.exports = (node, config) => {
  const postcssNode = node;
  const namesOfBreakpoints = getNamesOfBreakpoints(config);
  const breakpointsList = breakpointsToCebabCase(namesOfBreakpoints);
  const breakpointsValues = removeRoundBrackets(postcssNode.params).split(', ');
  const lowerBreak = breakpointsValues[0];
  const upperBreak = breakpointsValues[1];
  const camelizeLowerBreak = camelize(lowerBreak);
  const camelizeUpperBreak = camelize(upperBreak);
  const namesOfBreakpointsHasLowerBreakpoint = checkIsBreakpointName(
    namesOfBreakpoints,
    camelizeLowerBreak,
  );
  const namesOfBreakpointsHasUpperBreakpoint = checkIsBreakpointName(
    namesOfBreakpoints,
    camelizeUpperBreak,
  );
  postcssNode.name = 'media';

  try {
    if (isInvalidFirstParameter.test(lowerBreak, config)) {
      postcssNode.remove(upperBreak);
      isInvalidFirstParameter(postcssNode, lowerBreak, breakpointsList);
    }

    if (namesOfBreakpointsHasLowerBreakpoint) {
      if (namesOfBreakpointsHasUpperBreakpoint) {
        const calculatedBreaks = calcBreakpointsBetween(
          lowerBreak,
          upperBreak,
          config,
        );

        if (isArray(calculatedBreaks)) {
          const calculatedLowerBreak = calculatedBreaks[0];
          const calculatedUpperBreak = calculatedBreaks[1];
          postcssNode.params = `screen and (min-width: ${calculatedLowerBreak}) and (max-width: ${calculatedUpperBreak})`;
        } else if (typeof calculatedBreaks === 'string') {
          const calculatedLowerBreak = calcBreakpointsBetween(
            lowerBreak,
            upperBreak,
            config,
          );
          postcssNode.params = `screen and (min-width: ${calculatedLowerBreak})`;
        }
      } else {
        postcssNode.remove();
        const recommendedBreaks = namesOfBreakpoints
          .filter(item => item !== lowerBreak)
          .join(', ');

        throw new Error(
          `
          ${upperBreak} is invalid second parameter in @t-between. Use ${recommendedBreaks}
          `,
        );
      }
    }

    if (HAS_PX.test(lowerBreak)) {
      if (HAS_PX.test(upperBreak)) {
        postcssNode.params = `screen and (min-width: ${toEm(
          lowerBreak,
        )}em) and (max-width: ${toEm(upperBreak)}em)`;
      } else {
        postcssNode.remove();
        throw new Error(
          `
            ${upperBreak} is invalid second parameter in @t-between.
            If the first parameter has pixels,
            then the second parameter must has pixels.
          `,
        );
      }
    }

    if (HAS_EM.test(lowerBreak)) {
      if (HAS_EM.test(upperBreak)) {
        postcssNode.params = `screen and (min-width: ${lowerBreak}) and (max-width: ${upperBreak})`;
      } else {
        postcssNode.remove();
        throw new Error(
          `
            ${upperBreak} is invalid second parameter in @t-between.
            If the first parameter has ems, then the second parameter must has ems.
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
