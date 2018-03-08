const calcBreakpointBelow = require('./');
const userConfig = require('../../mocks/userConfig');

describe('Utils of breakpoints', () => {
  describe('calcBreakpointBelow', () => {
    it('should correctly breakpoint name', () => {
      expect(calcBreakpointBelow('lgDesktop', userConfig)).toBe('74.99875em');
    });
  });
});
