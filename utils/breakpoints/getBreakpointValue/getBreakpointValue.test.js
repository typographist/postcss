const getBreakpointValue = require('./');
const userConfig = require('../../mocks/userConfig');

describe('Utils of breakpoints', () => {
  describe('getNamesOfBreakpoints', () => {
    it('should', () => {
      expect(getBreakpointValue('tablet', userConfig)).toBe(640);
    });
  });
});
