const getNamesOfBreakpoints = require('./');
const userConfig = require('../../mocks/userConfig');

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
