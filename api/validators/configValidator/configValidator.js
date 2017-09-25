import flatten from '../../helpers/flatten/flatten';
import findAll from '../../helpers/findAll/findAll';

import { isBaseString, isBaseContainPxOrEm, isValidBases } from '../baseValidator/baseValidator';
import isValidLineHeights from '../lineHeightValidator/lineHeightValidator';
import { isValidRatios } from '../ratioValidator/ratioValidator';
import { breakpointIsString, isBreakpointContainsPxOrEm, isValidBreakpoints } from '../breakpointsValidator/breakpointsValidator';


const isValidConfig = (config) => {
  const bases = flatten(findAll(config, 'base'));
  const lineHeighs = findAll(config, 'lineHeight');
  const ratios = findAll(config, 'ratio');
  const breaks = findAll(config, 'breakpoint');

  return [
    isValidBases(bases, isBaseString),
    isValidBases(bases, isBaseContainPxOrEm),
    isValidLineHeights(lineHeighs),
    isValidRatios(ratios),
    isValidBreakpoints(breaks, breakpointIsString),
    isValidBreakpoints(breaks, isBreakpointContainsPxOrEm),
  ].every(Boolean);
};

export default isValidConfig;
