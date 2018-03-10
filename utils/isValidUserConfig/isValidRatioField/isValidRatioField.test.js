const { ratioHasAt, isValidRatio, isValidRatios } = require('./');

describe('isValidRatioField function', () => {
  describe('ratioHasAt', () => {
    it('should be contains word at in entry string', () => {
      expect(ratioHasAt('5678px at 8.888')).toBe(true);
    });

    it('should be not contains word at in string', () => {
      expect(ratioHasAt('this is incorrect string')).toBe(false);
    });
  });

  describe('isValidRatio', () => {
    // it('should typeof ratio is number', () => {
    //   expect(isValidRatio(11111)).toBe(true);
    // });
    it('should be typeof ratio is string and contains word at', () => {
      expect(isValidRatio('5678px at 8.888')).toBe(true);
    });
    // it('should be typeof ratio is string and contains word at', () => {
    //   expect(isValidRatio(NaN)).toBe(false);
    // });
    // describe('isValidRatios', () => {
    //   expect(isValidRatios([1111, '12px at 8.7'])).toBe(true);
    // });
  });
});
