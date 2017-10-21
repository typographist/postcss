const flatten = require('lodash').flatten;
const findAll = require('../helpers/findAll');
const isBaseString = require('./baseValidator/baseValidator').isBaseString;
const isBaseContainPxOrEm = require('./baseValidator/baseValidator').isBaseContainPxOrEm;
const isValidBases = require('./baseValidator/baseValidator').isValidBases;
const isValidLineHeights = require('./lineHeightValidator/lineHeightValidator');
const isValidRatios = require('./ratioValidator/ratioValidator').isValidRatios;
const breakpointIsString = require('./breakpointsValidator/breakpointsValidator').breakpointIsString;
const isBreakpointContainsPxOrEm = require('./breakpointsValidator/breakpointsValidator').isBreakpointContainsPxOrEm;
const isValidBreakpoints = require('./breakpointsValidator/breakpointsValidator').isValidBreakpoints;
const getBreakpoints = require('./breakpointsValidator/breakpointsValidator').getBreakpoints;
const checkContainsBreakpointKey = require('./breakpointsValidator/breakpointsValidator').checkContainsBreakpointKey;

const isValidConfig = (config) => {
  const bases = flatten(findAll(config, 'base'));
  const lineHeighs = findAll(config, 'lineHeight');
  const ratios = findAll(config, 'ratio');
  const breaks = findAll(config, 'breakpoint');
  const breakpoints = getBreakpoints(config);

  return [
    isValidBases(bases, isBaseString),
    isValidBases(bases, isBaseContainPxOrEm),
    isValidLineHeights(lineHeighs),
    isValidRatios(ratios),
    isValidBreakpoints(breakpoints, checkContainsBreakpointKey),
    isValidBreakpoints(breaks, breakpointIsString),
    isValidBreakpoints(breaks, isBreakpointContainsPxOrEm),
  ].every(Boolean);
};

module.exports = isValidConfig;

