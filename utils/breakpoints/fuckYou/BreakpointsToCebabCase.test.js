const breakpointsToCebabCase = require('./');

const names = ['tablet', 'desktop', 'lgDesktop', 'xlDesktop'];

describe('Utils of breakpoints', () => {
  describe('breakpointsToCebabCase', () => {
    it('should convert names of breakpoins to cebab case', () => {
      expect(breakpointsToCebabCase(names)).toBe(
        'tablet, desktop, lg-desktop, xl-desktop',
      );
    });
  });
});
