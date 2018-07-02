const { HAS_REM } = require('./');

describe('regexes', () => {
  describe('HAS_REM', () => {
    it('should has rems', () => {
      expect(HAS_REM.test('12rem')).toBe(true);
    });

    it('should negative floating point number contains rems', () => {
      expect(HAS_REM.test('-12.34px')).toBe(false);
    });

    it('should floating-point number has rems', () => {
      expect(HAS_REM.test('567.88rem')).toBe(true);
    });

    it('should does not contain pixels', () => {
      expect(HAS_REM.test('12px')).toBe(false);
    });

    it('should floating-point number does not contain rems', () => {
      expect(HAS_REM.test('12.34px')).toBe(false);
    });
  });
});
