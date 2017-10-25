const isValidConfig = require('../validator');
const makeDefaultBreakpoint = require('./makeDefaultBreakpoint');
const getBreakpointsName = require('./makeBreakpoints').getBreakpointsName;
const getBreakpoints = require('./makeBreakpoints').getBreakpoints;
const setBreakpointName = require('./makeBreakpoints').setBreakpointName;
const setBreakpointValue = require('./makeBreakpoints').setBreakpointValue;
const removeKey = require('./removeKey');
const getRatio = require('./getRatio').getRatio;
const getValue = require('./getValue');
const stripUnit = require('../../helpers/stripUnit');
const setRootSize = require('./setRootSize');


/**
 * @param {object} config
 * @return {array<object>}
 */ 
const calculator = (config) => {
  if (!isValidConfig(config)) return false;

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
  result = result
    .reduce((breakpoints, item, i) => {
      const stripBase = stripUnit(item.base);

      return [
        ...breakpoints,
        {
          ...item,
          base: !item.base ? breakpoints[i - 1].base : stripBase,
          lineHeight: !item.lineHeight ? breakpoints[i - 1].lineHeight : item.lineHeight,
          ratio: !item.ratio ? breakpoints[i - 1].ratio : getRatio(item.ratio, stripBase),
          value: getValue(item.value),
        },
      ];
    }, []);
  result = setRootSize(result);

  return result;
};

module.exports = calculator;
