const getBreakpointMax = require('./');
const { userConfig } = require('../../mocks');

describe('Utils of breakpoints', () => {
  describe('getBreakpointMax', () => {
    it('should', () => {
      expect(getBreakpointMax('desktop', userConfig)).toBe(1199.98);
    });
  });
});
