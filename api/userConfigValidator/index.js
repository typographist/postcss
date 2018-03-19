const flatten = require('lodash.flatten');
const { isValidRatios } = require('./isValidRatioField');
const { findAll } = require('../../helpers');
const {
  isBaseString,
  baseHasPxOrEm,
  isValidBases,
} = require('./isValidBaseField');
const isValidLineHeightField = require('./isValidLineHeightField');
const {
  breakpointIsString,
  breakpointHasPxOrEm,
  isValidBreakpointsField,
  getBreakpoints,
  breakpointHasBreakpointKey,
} = require('./isValidBreakpointsField');

/**
 * The function validates the user config.
 * @param {Object} config User configuration.
 * @return {boolean} valid or invalid user configuration.
 */
module.exports = config => {
  const findAllValues = val => findAll(config, val);

  const bases = flatten(findAllValues('base'));
  const lineHeights = findAllValues('lineHeight');
  const ratios = findAllValues('ratio');
  const breaks = findAllValues('breakpoint');
  const breakpoints = getBreakpoints(config);

  return [
    isValidBases(bases, isBaseString),
    isValidBases(bases, baseHasPxOrEm),
    isValidLineHeightField(lineHeights),
    isValidRatios(ratios),
    isValidBreakpointsField(breakpoints, breakpointHasBreakpointKey),
    isValidBreakpointsField(breaks, breakpointIsString),
    isValidBreakpointsField(breaks, breakpointHasPxOrEm),
  ].every(Boolean);
};
