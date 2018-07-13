const { ALL_CHARACTERS_BEFORE_COLON } = require('./');

describe('regexes', () => {
  describe('ALL_CHARACTERS_BEFORE_COLON', () => {
    it('should return all characters after colon', () => {
      expect(
        '(tablet, desktop):portrait'.replace(ALL_CHARACTERS_BEFORE_COLON, ''),
      ).toBe('portrait');
    });
  });
});
