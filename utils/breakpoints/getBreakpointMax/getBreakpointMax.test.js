const getBreakpointMax = require('./');
const { userConfig } = require('../../mocks');

describe('Utils of breakpoints', () => {
  describe('getBreakpointMax', () => {
    it('should return value of next breakpoint', () => {
      expect(getBreakpointMax('desktop', userConfig)).toBe(1199.98);
    });
  });
});
