const calcBreakpointOnly = require('./');
const { userConfig } = require('../../../helpersForTests/mocks');

describe('Utils of breakpoints', () => {
  describe('calcBreakpointOnly', () => {
    it('should return array of values from lg-desktop to xl-desktop - 0.02 px and convert to em', () => {
      expect(calcBreakpointOnly('lg-desktop', userConfig)).toEqual([
        '62em',
        '74.99875em',
      ]);
    });
  });
});
