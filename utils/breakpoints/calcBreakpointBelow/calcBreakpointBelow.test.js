const calcBreakpointBelow = require('./');
const { userConfig } = require('../../mocks');

describe('Utils of breakpoints', () => {
  describe('calcBreakpointBelow', () => {
    it('should correctly breakpoint name', () => {
      expect(calcBreakpointBelow('lg-desktop', userConfig)).toBe('99.99875em');
    });

    it('should invalid breakpoint', () => {
      expect(calcBreakpointBelow('xl-desktop', userConfig)).toBe(null);
    });
  });
});
