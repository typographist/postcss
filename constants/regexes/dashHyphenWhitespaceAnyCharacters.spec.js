const { DASH_HYPHEN_WHITESPACE_ANY_CHARACTERS } = require('./');

describe('regexes', () => {
  describe('DASH_HYPHEN_WHITESPACE_ANY_CHARACTERS', () => {
    it('should replace dash, hyphen, whitespace and any characters', () => {
      expect(
        'Hello_World'.replace(
          DASH_HYPHEN_WHITESPACE_ANY_CHARACTERS,
          (match, chr) => (chr ? chr.toUpperCase() : ''),
        ),
      ).toBe('HelloWorld');
    });
  });
});
