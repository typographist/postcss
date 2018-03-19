const { camelize } = require('humps');
const { HAS_EM, HAS_PX } = require('../../../constants/regexes');
const isInvalidFirstParameter = require('./isInvalidFirstParameter');
const {
  breakpointsToCebabCase,
  calcBreakpointsBetween,
  checkIsBreakpointName,
  getNamesOfBreakpoints,
  removeRoundBrackets,
} = require('../../../api/breakpoints');
const { isArray, toEm } = require('../../../helpers');

module.exports = (atrule, config) => {
  const postcssAtrule = atrule;
  const namesOfBreakpoints = getNamesOfBreakpoints(config);
  const breakpointsList = breakpointsToCebabCase(namesOfBreakpoints);
  const breakpointsValues = removeRoundBrackets(postcssAtrule.params).split(
    ', ',
  );
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
  postcssAtrule.name = 'media';

  try {
    if (isInvalidFirstParameter.test(lowerBreak, config)) {
      postcssAtrule.remove(upperBreak);
      isInvalidFirstParameter(postcssAtrule, lowerBreak, breakpointsList);
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
          postcssAtrule.params = `screen and (min-width: ${calculatedLowerBreak}) and (max-width: ${calculatedUpperBreak})`;
        } else if (typeof calculatedBreaks === 'string') {
          const calculatedLowerBreak = calcBreakpointsBetween(
            lowerBreak,
            upperBreak,
            config,
          );
          postcssAtrule.params = `screen and (min-width: ${calculatedLowerBreak})`;
        }
      } else {
        postcssAtrule.remove();
        const recommendedBreaks = namesOfBreakpoints
          .filter(item => item !== lowerBreak)
          .join(', ');

        throw new Error(`
          "${upperBreak}" is incorrect second parameter of @t-between. Use "${recommendedBreaks}".
          `);
      }
    }

    if (HAS_PX.test(lowerBreak)) {
      if (HAS_PX.test(upperBreak)) {
        postcssAtrule.params = `screen and (min-width: ${toEm(
          lowerBreak,
        )}em) and (max-width: ${toEm(upperBreak)}em)`;
      } else {
        postcssAtrule.remove();
        throw new Error(
          `
            "${upperBreak}" is incorrect second parameter of @t-between. If the first parameter has pixels,
            then the second parameter must has pixels. For example @t-between(1000px, 2000px).
          `,
        );
      }
    }

    if (HAS_EM.test(lowerBreak)) {
      if (HAS_EM.test(upperBreak)) {
        postcssAtrule.params = `screen and (min-width: ${lowerBreak}) and (max-width: ${upperBreak})`;
      } else {
        postcssAtrule.remove();
        throw new Error(
          `
            "${upperBreak}" is incorrect second parameter of @t-between.
            If the first parameter has ems, then the second parameter must has ems. For example @t-between(30em, 50em).
          `,
        );
      }
    }
  } catch (err) {
    console.warn(err.message);
  }
};

module.exports.test = atrule => atrule.name === 't-between';
