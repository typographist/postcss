import flatten from '../../helpers/flatten/flatten';
import findAll from '../../helpers/findAll/findAll';

import {  } from '';
import {  } from '';
import {  } from '';
import {  } from '';


export const isConfigValid = (config) => {
  const bases = flatten(findAll(config, 'base'));
  const lineHeighs = findAll(config, 'lineHeight');
  const ratios = findAll(config, 'ratio');
  const breaks = findAll(config, 'breakpoint');

  // return [
  //   isAllBasesAreStrings(bases),
  //   isAllBasesAreValid(bases),
  //   isValidLineHeights(lineHeighs),
  //   isValidRatios(ratios),
  //   isValidBreakpoints(breaks),
  // ].every(Boolean);
};

export default isConfigValid;
