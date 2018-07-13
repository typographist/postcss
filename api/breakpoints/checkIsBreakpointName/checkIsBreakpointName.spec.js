const checkIsBreakpointName = require('./');

const names = ['tablet', 'desktop', 'lgDesktop', 'xlDesktop'];

describe('Utils of breakpoints', () => {
  describe('checkIsBreakpointName', () => {
    it('should if breakpoints has breakpoint name', () => {
      expect(checkIsBreakpointName(names, 'desktop')).toBe(true);
    });

    it('should if breakpoints not contains breakpoint name', () => {
      expect(checkIsBreakpointName(names, 'funckYeahhh!')).toBe(false);
    });
  });
});
