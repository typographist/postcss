const { HAS_TSTEP_FUNCTION_WITH_VALUE } = require('./');

describe('regexes', () => {
  describe('HAS_TSTEP_FUNCTION_WITH_VALUE', () => {
    it('should find t-step function', () => {
      expect(HAS_TSTEP_FUNCTION_WITH_VALUE.test('t-step(12)')).toBe(true);
    });

    it('should not find t-step function', () => {
      expect(HAS_TSTEP_FUNCTION_WITH_VALUE.test('tt-step(12))')).toBe(false);
    });
  });
});
