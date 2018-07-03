const { LINE_BREAKS_AND_SPACES } = require('./');

describe('regexes', () => {
  describe('LINE_BREAKS_AND_SPACES', () => {
    it('should remove line breaks and spaces', () => {
      expect(
        '.test \n.some-test   .wrapper \n\n'.replace(
          LINE_BREAKS_AND_SPACES,
          '',
        ),
      ).toBe('.test.some-test.wrapper');
    });
  });
});
