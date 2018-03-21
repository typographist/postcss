const getBreakpointValue = require('./');
const { userConfig } = require('../../../helpersForTests/mocks');

describe('Utils of breakpoints', () => {
  describe('getBreakpointValue', () => {
    it('should return value of breakpoint', () => {
      expect(getBreakpointValue('tablet', userConfig)).toBe(576);
    });

    it('should is invalid breakpoint name', () => {
      expect(getBreakpointValue('blablabla', userConfig)).toBe(null);
    });
  });
});
