const { AMPERSAND } = require('./');

describe('regexes', () => {
  describe('AMPERSAND', () => {
    it('should find an ampersand', () => {
      expect(AMPERSAND.test('&')).toBe(true);
    });
  });
});
