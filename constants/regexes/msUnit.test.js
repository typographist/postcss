const { MS_UNIT } = require('./');

describe('regexes', () => {
  describe('MS_UNIT', () => {
    it('should find ms unit', () => {
      expect(MS_UNIT.test('ms')).toBe(true);
    });

    it('should not find ms unit', () => {
      expect(MS_UNIT.test('fake!')).toBe(false);
    });
  });
});
