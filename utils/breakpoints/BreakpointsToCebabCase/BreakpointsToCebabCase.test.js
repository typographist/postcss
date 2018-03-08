const toCebabCase = require('./');

const names = ['tablet', 'desktop', 'lgDesktop', 'xlDesktop'];

describe('Utils of breakpoints', () => {
  describe('toCebabCase', () => {
    it('should', () => {
      expect(toCebabCase(names)).toBe(
        'tablet, desktop, lg-desktop, xl-desktop',
      );
    });
  });
});
