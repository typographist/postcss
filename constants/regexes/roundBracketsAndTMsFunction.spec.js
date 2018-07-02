const { ROUND_BRACKETS_AND_TSTEP_FUNCTION } = require('./');

describe('regexes', () => {
  describe('ROUND_BRACKETS_AND_TSTEP_FUNCTION', () => {
    it('should remove round brackets and t-step function', () => {
      expect('t-step(12)'.replace(ROUND_BRACKETS_AND_TSTEP_FUNCTION, '')).toBe(
        '12',
      );
    });
  });
});
