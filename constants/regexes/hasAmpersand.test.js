const { HAS_AMPERSAND } = require('./');

describe('regexes', () => {
  describe('HAS_AMPERSAND', () => {
    it('should remove ampersand from selector', () => {
      expect(HAS_AMPERSAND.test('&__inner')).toBe(true);
    });
  });
});
