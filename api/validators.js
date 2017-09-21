import * as helpers from './helpers';

/**
 * Whether the parametr is an string?
 * @param {any} val
 * @return {boolean} 
 */
export const isBaseString = (val) => {
  try {
    switch (typeof val) {
      case 'string':
        return true;
      default:
        throw new Error('Base value must be a string or Array<string>!');
    }
  } catch (err) {
    console.log(err.message);
    return false;
  }
};


/**
// Are all the values of bases a string?
 * @param {array<any>} bases - flat array of values of base
 * @return {boolean}
 */
export const isAllBasesAreStrings = bases => (
  bases.every(base => isBaseString(base))
);


/**
 * Check whether each array value contains pixels and ems
 * @param {array<string>} bases flat array 
 * @return {boolean}
 */
export const isAllBasesAreValid = bases => (
  bases.every(base => helpers.isBaseContainPxOrEm(base))
);


/**
 * Check whether all the values of the number?
 * @param {array<any>} lineHeights
 * @return {boolean}
 */
export const isValidLineHeights = lineHeights => (
  lineHeights.every(lineHeight => helpers.isNumber(lineHeight))
);


/**
 * Check whether the ratio is a number or a string corresponding to the pattern.
 * @param {array<any>} ratios - flat array
 * @return {boolean}
 */
export const isValidRatios = ratios => (
  ratios.every(ratio => helpers.isValidRatio(ratio))
);

export const isValidBreakpoints = breakpoints => (
  breakpoints.every(breakpoint => helpers.isValidBreakpoint(breakpoint))
);

export const isConfigValid = (object) => {
  const bases = helpers.isBaseStringdeepFind(object, 'base').toString().split(',');
  const lineHeighs = helpers.isBaseStringdeepFind(object, 'lineHeight');
  const ratios = helpers.isBaseStringdeepFind(object, 'ratio');
  const breaks = helpers.isBaseStringdeepFind(object, 'breakpoint');

  return [
    isAllBasesAreStrings(bases),
    isAllBasesAreValid(bases),
    isValidLineHeights(lineHeighs),
    isValidRatios(ratios),
    isValidBreakpoints(breaks),
  ].every(Boolean);
};

export default isConfigValid;
