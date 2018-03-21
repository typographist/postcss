const { HAS_AT } = require('./');

describe('regexed', () => {
  describe('HAS_AT', () => {
    it(`should string corresponds to a 
        positive / positive floating-point and pixel 
        or em format as units of measurement, 
        a space, a word at, a space, 
        a negative / positive floating-point number without units of measure.`, () => {
      expect(HAS_AT.test('123px at 7')).toBe(true);
    });

    it('should first value has the pixels', () => {
      expect(HAS_AT.test('123px at 7')).toBe(true);
    });

    it('should first value has the ems', () => {
      expect(HAS_AT.test('123em at 7')).toBe(true);
    });

    it('should first number does not contain the units of measure.', () => {
      expect(HAS_AT.test('123 at 7')).toBe(false);
    });

    it('should The last value has units of measure', () => {
      expect(HAS_AT.test('123px at 7px')).toBe(false);
    });
  });
});
