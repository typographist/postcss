const checkIsBreakpointName = require('./');

const namesArr = ['tablet', 'desktop', 'lgDesktop', 'xlDesktop'];

describe('Utils of breakpoints', () => {
  describe('', () => {
    it('should', () => {
      expect(checkIsBreakpointName(namesArr, 'desktop')).toBe(true);
    });
  });
});
