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
const isValidUserConfig = require('../isValidUserConfig');

/**
 * @param {Object} config User configuration.
 * @return {Array<Object>} An array containing object of the default breakpoint.
 */
const makeFirstBreakpoint = config =>
  [{}]
    .map(item => ({ ...item, base: config.base }))
    .map(item => ({ ...item, lineHeight: config.lineHeight }))
    .map(item => ({ ...item, ratio: config.ratio }))
    .map(item => ({ ...item, value: '0px' }))
    .map(item => ({ ...item, name: 'default' }));

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
const makeBreakpoints = (config, fn) => {
  const namesOfBreakpoints = fn(config);

  return Object.values(config)
    .filter(b => isObject(b) && b.breakpoint)
    .map((b, i) => ({ ...b, name: namesOfBreakpoints[i] }))
    .map(b => ({ ...b, value: b.breakpoint }))
    .map(b => omit(b, 'breakpoint'));
};

/**
 * @param {string} value The value of the breakpoint in pixels or em.
 * @return {number} The value of the breakpoint in pixels without units of measure.
 */
const toPxValueOfBreakpoint = value =>
  HAS_EM.test(value) ? toPx(value) : value;

const makeBreakpointsModel = config => {
  if (!isValidUserConfig(config)) return null;

  return [
    ...makeFirstBreakpoint(config),
    ...makeBreakpoints(config, getNamesOfBreakpoints),
  ]
    .reduce((breakpoint, item, i) => {
      const stripBase = stripUnit(item.base);

      return [
        ...breakpoint,
        {
          ...item,
          base: !item.base ? breakpoint[i - 1].base : stripBase,
        },
      ];
    }, [])
    .reduce(
      (breakpoint, item, i) => [
        ...breakpoint,
        {
          ...item,
          lineHeight: !item.lineHeight
            ? breakpoint[i - 1].lineHeight
            : item.lineHeight,
        },
      ],
      [],
    )
    .reduce((breakpoint, item, i) => {
      const stripBase = stripUnit(item.base);

      return [
        ...breakpoint,
        {
          ...item,
          ratio: !item.ratio
            ? breakpoint[i - 1].ratio
            : getRatio(item.ratio, stripBase),
        },
      ];
    }, [])
    .reduce(
      (breakpoint, item) => [
        ...breakpoint,
        {
          ...item,
          value: toPxValueOfBreakpoint(item.value),
        },
      ],
      [],
    )
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
