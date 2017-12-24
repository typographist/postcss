const flatten = require('lodash').flatten;
const isValidRatios = require('./ratioValidator').isValidRatios;
const findAll = require('../../helpers/findAll');
const baseValidator = require('./baseValidator');
const isValidLineHeights = require('./lineHeightValidator');
const breakpointsValidator = require('./breakpointsValidator');

const isBaseString = baseValidator.isBaseString;
const isBaseContainPxOrEm = baseValidator.isBaseContainPxOrEm;
const isValidBases = baseValidator.isValidBases;
const breakpointIsString = breakpointsValidator.breakpointIsString;
const isBreakpointContainsPxOrEm = breakpointsValidator.isBreakpointContainsPxOrEm;
const isValidBreakpoints = breakpointsValidator.isValidBreakpoints;
const getBreakpoints = breakpointsValidator.getBreakpoints;
const checkContainsBreakpointKey = breakpointsValidator.checkContainsBreakpointKey;

/**
 * @param {array<object>}
 * @return {boolean}
 */
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

