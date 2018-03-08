const calcBreakpointsBetween = require('./');
const { userConfig } = require('../../mocks');

describe('Utils of breakpoints', () => {
  describe('calcBreakpointsBetween', () => {
    it('should return a breakpoint array of values between tablet and lg-desktop - 0.02px and convert to em', () => {
      expect(calcBreakpointsBetween('tablet', 'desktop', userConfig)).toEqual([
        '40em',
        '74.99875em',
      ]);
    });

    it('should if invalid breakpoint', () => {
      expect(
        calcBreakpointsBetween('lg-desktop', 'xl-desktop', userConfig),
      ).toBe(null);
    });
  });
});
