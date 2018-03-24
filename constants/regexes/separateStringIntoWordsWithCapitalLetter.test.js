const { SEPARATE_STRING_INTO_WORDS_WITH_CAPITAL_LETTER } = require('./');

describe('helpers', () => {
  describe('SEPARATE_STRING_INTO_WORDS_WITH_CAPITAL_LETTER', () => {
    it('should separate string', () => {
      expect(
        'HelloWorld'.split(SEPARATE_STRING_INTO_WORDS_WITH_CAPITAL_LETTER),
      ).toEqual(['Hello', 'World']);
    });
  });
});
