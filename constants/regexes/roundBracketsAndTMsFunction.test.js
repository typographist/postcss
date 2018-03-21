const { ROUND_BRACKETS_AND_TMS_FUNCTION } = require('./');

describe('regexes', () => {
  describe('ROUND_BRACKETS_AND_TMS_FUNCTION', () => {
    it('should remove round brackets and t-ms function', () => {
      expect('t-ms(12)'.replace(ROUND_BRACKETS_AND_TMS_FUNCTION, '')).toBe(
        '12',
      );
    });
  });
});
