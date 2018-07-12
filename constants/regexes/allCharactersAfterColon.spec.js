const { ALL_SYMBOLS_AFTER_COLON } = require('./');

describe('regexes', () => {
  describe('ALL_SYMBOLS_AFTER_COLON', () => {
    it('should return all characters after colon', () => {
      expect(
        '(tablet, desktop):portrait'.replace(ALL_SYMBOLS_AFTER_COLON, ''),
      ).toBe('(tablet, desktop)');
    });
  });
});
