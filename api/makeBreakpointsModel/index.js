const omit = require('lodash.omit');
const {
  toPx,
  calcLeading,
  calcRoot,
  isObject,
  stripUnit,
} = require('../../helpers');
const { HAS_EM } = require('../../constants/regexes');
const { getRatio } = require('./getRatio');
const isValidUserConfig = require('../userConfigValidator');

/**
 * @param {Object} config User configuration.
 * @return {Array<Object>} An array containing object of the default breakpoint.
 */
const makeFirstBreakpoint = config =>
  [{}].map(item => ({
    ...item,
    base: config.base,
    lineHeight: config.lineHeight,
    ratio: config.ratio,
    value: '0px',
    name: 'default',
  }));

/**
 * @param {Object} config User configuration.
 * @return {Array<Object>} Names of breakpoints.
 */
const getNamesOfBreakpoints = config =>
  Object.keys(config).filter(key =>
    [key !== 'base', key !== 'lineHeight', key !== 'ratio'].every(Boolean),
  );

/**
 * @param {Object} config User configuration.
 * @param {Function} fn getNamesOfBreakpoints function.
 * @return {Array<Object>} An array with objects of breakpoints, not including the first breakpoint.
 */
const makeBreakpoints = config => {
  const namesOfBreakpoints = getNamesOfBreakpoints(config);

  return (
    Object.values(config)
      .filter(b => isObject(b) && b.breakpoint)
      .map((b, i) => ({
        ...b,
        name: namesOfBreakpoints[i],
        value: b.breakpoint,
      }))
      // Remove the key with the name breakpoint.
      .map(b => omit(b, 'breakpoint'))
  );
};

/**
 * @param {string} value The value of the breakpoint in pixels or em.
 * @return {number} The value of the breakpoint in pixels without units of measure.
 */
const toPxValueOfBreakpoint = value =>
  HAS_EM.test(value) ? toPx(value) : value;

/**
 * The function creates an array with an object for each breakpoint.
 * If there is no value in the current breakpoint, for example, the ratio,
 * we inherit it from the previous breakpoint. Calculate the value of the ratio
 *if it was specified as a string with the "at" parameter (example: "45px at 6").
 * Convert the value of breakpoint to pixels, if it is specified in em. We add and calculate the value of root.
 *
 * @param {Object} config User configuration.
 */
const makeBreakpointsModel = config => {
  if (!isValidUserConfig(config)) return null;

  return [...makeFirstBreakpoint(config), ...makeBreakpoints(config)]
    .reduce((breakpoint, item, i) => {
      const stripBase = stripUnit(item.base);

      return [
        ...breakpoint,
        {
          ...item,
          base: !item.base ? breakpoint[i - 1].base : stripBase,
          lineHeight: !item.lineHeight
            ? breakpoint[i - 1].lineHeight
            : item.lineHeight,
          ratio: !item.ratio
            ? breakpoint[i - 1].ratio
            : getRatio(item.ratio, stripBase),
          value: toPxValueOfBreakpoint(item.value),
        },
      ];
    }, [])
    .map(item => {
      const leading = calcLeading(item.base, item.lineHeight);

      return { ...item, root: calcRoot(leading) };
    });
};

module.exports = {
  makeFirstBreakpoint,
  getNamesOfBreakpoints,
  makeBreakpoints,
  toPxValueOfBreakpoint,
  makeBreakpointsModel,
};
