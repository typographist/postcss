const checkIsBreakpointName = require('./');

const namesArr = ['tablet', 'desktop', 'lgDesktop', 'xlDesktop'];

describe('Utils of breakpoints', () => {
  describe('checkIsBreakpointName', () => {
    it('should if breakpoints has breakpoint name', () => {
      expect(checkIsBreakpointName(namesArr, 'desktop')).toBe(true);
    });

    it('should if breakpoints not contains breakpoint name', () => {
      expect(checkIsBreakpointName(namesArr, 'funckYeahhh!')).toBe(false);
    });
  });
});
