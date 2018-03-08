const getBreakpointAbove = require('./');
const { userConfig } = require('../../mocks');

describe('Utils of breakpoints', () => {
  describe('getBreakpointAbove', () => {
    it('should return value of xlDesktop breakpoint', () => {
      expect(getBreakpointAbove('xlDesktop', userConfig)).toBe('100em');
    });
  });
});
