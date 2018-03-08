const getNamesOfBreakpoints = require('./');
const { userConfig } = require('../../mocks');

describe('Utils of breakpoints', () => {
  describe('getNamesOfBreakpoints', () => {
    it('should', () => {
      expect(getNamesOfBreakpoints(userConfig)).toEqual([
        'tablet',
        'desktop',
        'lgDesktop',
        'xlDesktop',
      ]);
    });
  });
});
