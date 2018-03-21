const calcBreakpointsBetween = require('./');
const { userConfig } = require('../../../helpersForTests/mocks');

describe('Utils of breakpoints', () => {
  describe('calcBreakpointsBetween', () => {
    it('should return a breakpoint array of values between tablet and lg-desktop - 0.02px and convert to em', () => {
      expect(calcBreakpointsBetween('tablet', 'desktop', userConfig)).toEqual([
        '36em',
        '61.99875em',
      ]);
    });

    it('should if invalid breakpoint', () => {
      expect(
        calcBreakpointsBetween('lg-desktop', 'xl-desktop', userConfig),
      ).toBe('62em');
    });
  });
});
