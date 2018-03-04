const makeDefaultBreakpoint = require('./makeDefaultBreakpoint');
const { stripUnit } = require('..//helpers');
const isValidUserConfig = require('../isValidUserConfig');
const setRootSize = require('./setRootSize');
const removeKey = require('./removeKey');
const getValue = require('./getValue');
const { getRatio } = require('./getRatio');
const {
  getBreakpointsName,
  getBreakpoints,
  setBreakpointName,
  setBreakpointValue,
} = require('./makeBreakpoints');

/**
 * @param {object} config
 * @return {array<object>}
 */

module.exports = config => {
  if (!isValidUserConfig(config)) return false;

  const firstBreakpoint = makeDefaultBreakpoint(config);
  const breakpointsWithNames = setBreakpointName(
    getBreakpoints(config),
    getBreakpointsName(config),
  );

  const breakpointsWithValues = setBreakpointValue(breakpointsWithNames);
  const rawBreakpoints = removeKey('breakpoint', breakpointsWithValues);

  let result = [];

  result.push(firstBreakpoint);
  result = [...result, ...rawBreakpoints];
  result = result.reduce((breakpoints, item, i) => {
    const stripBase = stripUnit(item.base);

    return [
      ...breakpoints,
      {
        ...item,
        base: !item.base ? breakpoints[i - 1].base : stripBase,
        lineHeight: !item.lineHeight
          ? breakpoints[i - 1].lineHeight
          : item.lineHeight,
        ratio: !item.ratio
          ? breakpoints[i - 1].ratio
          : getRatio(item.ratio, stripBase),
        value: getValue(item.value),
      },
    ];
  }, []);
  result = setRootSize(result);

  return result;
};
