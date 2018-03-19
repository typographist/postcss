const validators = require('./');

describe('isValidUserConfig', () => {
  describe('baseHasPxOrEm function', () => {
    it('shoud valid base field', () => {
      expect(validators.baseHasPxOrEm('24px')).toBe(true);
    });

    it('should valid base filed', () => {
      expect(validators.baseHasPxOrEm('7em')).toBe(true);
    });

    it('should invalid base field', () => {
      expect(validators.baseHasPxOrEm('8000rem')).toBe(false);
    });

    it('should invalid base field', () => {
      expect(validators.baseHasPxOrEm('blablabla')).toBe(false);
    });
  });

  describe('isBaseString', () => {
    it('should value of base is string', () => {
      expect(validators.isBaseString('Yep!')).toBe(true);
    });

    it('should value of base not string ', () => {
      expect(validators.isBaseString(NaN)).toBe(false);
    });
  });

  describe('isValidBases', () => {
    it('should if every string in the array is string', () => {
      expect(
        validators.isValidBases(
          ['this', 'is', 'test'],
          validators.isBaseString,
        ),
      ).toBe(true);
    });

    it('should if every string in the array has px or ems', () => {
      expect(
        validators.isValidBases(['1em', '2em', '3em'], validators.isBaseString),
      ).toBe(true);
    });
  });
});
