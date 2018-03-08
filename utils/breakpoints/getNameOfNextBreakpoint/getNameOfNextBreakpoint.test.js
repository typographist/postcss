const getNameOfNextBreakpoint = require('./');
const { userConfig } = require('../../mocks');

describe('Utils of breakpoints', () => {
  describe('getNameOfNextBreakpoint', () => {
    it('should get name of next breakpoint', () => {
      expect(getNameOfNextBreakpoint('tablet', userConfig)).toBe('desktop');
    });
  });
});
