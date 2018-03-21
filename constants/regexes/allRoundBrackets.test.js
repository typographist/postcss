const { ALL_ROUND_BRACKETS } = require('./');

describe('regexes', () => {
  describe('ALL_ROUND_BRACKETS', () => {
    it('should remove round brackets', () => {
      expect('(12)'.replace(ALL_ROUND_BRACKETS, '')).toBe('12');
    });
  });
});
