import { flatten } from 'lodash';
import findAll from '../helpers/findAll';

import { isBaseString, isBaseContainPxOrEm, isValidBases } from './baseValidator/baseValidator';
import isValidLineHeights from './lineHeightValidator/lineHeightValidator';
import { isValidRatios } from './ratioValidator/ratioValidator';
import { breakpointIsString, isBreakpointContainsPxOrEm, isValidBreakpoints, getBreakpoints, checkContainsBreakpointKey  } from './breakpointsValidator/breakpointsValidator';


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

export default isValidConfig;
