import stripUnit from '../../helpers/stripUnit';

/**
 * @param {object} validConfig
 * @return {object}
 */
const makeDefaultBreakpoint = (validConfig) => {
  const breakpoint = {};
  const { base, lineHeight, ratio } = validConfig;
  breakpoint.base = stripUnit(base);
  breakpoint.lineHeight = lineHeight;
  breakpoint.ratio = ratio;
  breakpoint.value = '0px';
  breakpoint.name = 'default';

  return breakpoint;
};

export default makeDefaultBreakpoint;
