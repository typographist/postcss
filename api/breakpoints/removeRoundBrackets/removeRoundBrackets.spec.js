const removeRoundBrackets = require('./');

describe('Utils of breakpoints', () => {
  describe('removeRoundBrackets', () => {
    it('should remove round brackets', () => {
      expect(removeRoundBrackets('(tablet)')).toBe('tablet');
    });
  });
});
