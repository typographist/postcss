const { flatten } = require('lodash');
const { isValidRatios } = require('./ratioValidator');
const { findAll } = require('../../helpers');
const {
  isBaseString,
  isBaseContainPxOrEm,
  isValidBases,
} = require('./baseValidator');
const isValidLineHeights = require('./lineHeightValidator');
const {
  breakpointIsString,
  isBreakpointContainsPxOrEm,
  isValidBreakpoints,
  getBreakpoints,
  checkContainsBreakpointKey,
} = require('./breakpointsValidator');

/**
 * @param {array<object>}
 * @return {boolean}
 */
const isValidConfig = config => {
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
