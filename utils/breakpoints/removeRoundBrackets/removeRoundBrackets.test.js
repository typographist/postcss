const removeRoundBrackets = require('./');

describe('Utils of breakpoints', () => {
  describe('removeRoundBrackets', () => {
    it('should', () => {
      expect(removeRoundBrackets('(tablet)')).toBe('tablet');
    });
  });
});
