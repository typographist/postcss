import * as validators from '../validators';


describe('isConfigValid function', () => {

  describe('isBaseString', () => {
    test('if the parametr string', () => {
      expect(validators.isBaseString('string')).toBe(true);
    });

    test('if the parametr is not an string', () => {
      expect(validators.isBaseString(12)).toBe(false);
    });
  });


  describe('isAllBasesAreStrings', () => {
    test('All values are strings', () => {
      expect(validators.isAllBasesAreStrings(['12px', '1'])).toBe(true);
    });

    test('One value is not a string', () => {
      expect(validators.isAllBasesAreStrings([1, '124'])).toBe(false);
    });
  });


  describe('isAllBasesAreValid', () => {
    test('All bases are valid', () => {
      expect(validators.isAllBasesAreValid(['1px', '2px', '3em'])).toBe(true);
    });

    test('Bases contains non-valid values', () => {
      expect(validators.isAllBasesAreValid([1, '5rem', {}])).toBe(false);
    });
  });

  // describe('isValidRatios', () => {
  //   test('typeof ratio === number', () => {
  //     expect(validators.isValidRatios(12)).toBe(true);
  //   });
  // });
});
