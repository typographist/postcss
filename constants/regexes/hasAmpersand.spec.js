const { AMPERSAND } = require('./');

describe('regexes', () => {
  describe('AMPERSAND', () => {
    it('should remove ampersand from selector', () => {
      expect(AMPERSAND.test('&__inner')).toBe(true);
    });
  });
});
