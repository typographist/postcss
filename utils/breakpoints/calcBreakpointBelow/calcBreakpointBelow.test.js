const calcBreakpointBelow = require('./');
const { userConfig } = require('../../mocks');

describe('Utils of breakpoints', () => {
  describe('calcBreakpointBelow', () => {
    it('should return value of xl-desktop - 0.02px and convert to em', () => {
      expect(calcBreakpointBelow('lg-desktop', userConfig)).toBe('99.99875em');
    });

    it('should if invalid breakpoint', () => {
      expect(calcBreakpointBelow('xl-desktop', userConfig)).toBe(null);
    });
  });
});
