const getBreakpointsBetween = require('./');
const { userConfig } = require('../../mocks');

describe('Utils of breakpoints', () => {
  describe('getBreakpointsBetween', () => {
    it('should return a breakpoint value between tablet and desktop', () => {
      expect(getBreakpointsBetween('tablet', 'desktop', userConfig)).toEqual([
        '40em',
        '74.99875em',
      ]);
    });

    it('should return null because the value of the maximum breakpoint is not correct', () => {
      expect(
        getBreakpointsBetween('lg-desktop', 'xl-desktop', userConfig),
      ).toBe(null);
    });
  });
});
