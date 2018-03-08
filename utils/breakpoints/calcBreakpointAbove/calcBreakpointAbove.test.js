const calcBreakpointAbove = require('./');
const { userConfig } = require('../../mocks');

describe('Utils of breakpoints', () => {
  describe('calcBreakpointAbove', () => {
    it('should return value of xl-desktop breakpoint', () => {
      expect(calcBreakpointAbove('xl-desktop', userConfig)).toBe('100em');
    });
  });
});
