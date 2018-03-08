const calcBreakpointOnly = require('./');
const { userConfig } = require('../../mocks');

describe('Utils of breakpoints', () => {
  describe('calcBreakpointOnly', () => {
    it('should return array of values from lg-desktop to xl-desktop - 0.02 px and convert to em', () => {
      expect(calcBreakpointOnly('lg-desktop', userConfig)).toEqual([
        '75em',
        '99.99875em',
      ]);
    });

    it('should if invalid breakpoint', () => {
      expect(calcBreakpointOnly('xl-desktop', userConfig)).toBe(null);
    });
  });
});
