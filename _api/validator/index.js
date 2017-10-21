const flatten = require('lodash').flatten;
const findAll = require('../helpers/findAll');
const isBaseString = require('./baseValidator').isBaseString;
const isBaseContainPxOrEm = require('./baseValidator').isBaseContainPxOrEm;
const isValidBases = require('./baseValidator').isValidBases;
const isValidLineHeights = require('./lineHeightValidator');
const isValidRatios = require('./ratioValidator').isValidRatios;
const breakpointIsString = require('./breakpointsValidator').breakpointIsString;
const isBreakpointContainsPxOrEm = require('./breakpointsValidator').isBreakpointContainsPxOrEm;
const isValidBreakpoints = require('./breakpointsValidator').isValidBreakpoints;
const getBreakpoints = require('./breakpointsValidator').getBreakpoints;
const checkContainsBreakpointKey = require('./breakpointsValidator').checkContainsBreakpointKey;

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

