const { HAS_TMS_FUNCTION_WITH_VALUE } = require('./');

describe('regexes', () => {
  describe('HAS_TMS_FUNCTION_WITH_VALUE', () => {
    it('should find t-ms function', () => {
      expect(HAS_TMS_FUNCTION_WITH_VALUE.test('t-ms(12)')).toBe(true);
    });

    it('should not find t-ms function', () => {
      expect(HAS_TMS_FUNCTION_WITH_VALUE.test('tt-ms(12))')).toBe(false);
    });
  });
});
