const { HAS_EM } = require('./');

describe('regexes', () => {
  describe('HAS_EM', () => {
    it('should has ems', () => {
      expect(HAS_EM.test('12em')).toBe(true);
    });

    it('should floating-point number has ems', () => {
      expect(HAS_EM.test('567.89em')).toBe(true);
    });

    it('should does not contain pixels', () => {
      expect(HAS_EM.test('12rem')).toBe(false);
    });

    it('should floating-point number does not contain pixels', () => {
      expect(HAS_EM.test('99.2rem')).toBe(false);
    });
  });
});
