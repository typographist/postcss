const { ALL_CHARACTERS_AFTER_COLON } = require('./');

describe('regexes', () => {
  describe('ALL_CHARACTERS_AFTER_COLON', () => {
    it('should return all characters after colon', () => {
      expect(
        '(tablet, desktop):portrait'.replace(ALL_CHARACTERS_AFTER_COLON, ''),
      ).toBe('(tablet, desktop)');
    });
  });
});
