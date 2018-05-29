const { ALL_AMPERSANDS } = require('./');

describe('regexes', () => {
  describe('ALL_AMPERSANDS', () => {
    it('should find an ampersand', () => {
      expect(ALL_AMPERSANDS.test('&')).toBe(true);
    });
  });
});
