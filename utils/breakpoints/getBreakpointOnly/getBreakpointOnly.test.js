const getBreakpointOnly = require('./');
const { userConfig } = require('../../mocks');

describe('Utils of breakpoints', () => {
  describe('getBreakpointOnly', () => {
    it('should correctly breakpoint name', () => {
      expect(getBreakpointOnly('lg-desktop', userConfig)).toEqual([
        '75em',
        '99.99875em',
      ]);
    });

    it('should invalid breakpoint', () => {
      expect(getBreakpointOnly('xl-desktop', userConfig)).toBe(null);
    });
  });
});
