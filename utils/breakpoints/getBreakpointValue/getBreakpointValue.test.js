const getBreakpointValue = require('./');
const { userConfig } = require('../../mocks');

describe('Utils of breakpoints', () => {
  describe('getNamesOfBreakpoints', () => {
    it('should', () => {
      expect(getBreakpointValue('tablet', userConfig)).toBe(640);
    });
  });
});
