import * as helpers from '../helpers';

describe('helpers', () => {


  describe('isObject', () => {
    test('if the parameter object', () => {
      expect(helpers.isObject({})).toBe(true);
    });

    test('if the parameter is not an object', () => {
      expect(helpers.isObject(12)).toBe(false);
    });
  });


  describe('isArray', () => {
    test('if the parametr array', () => {
      expect(helpers.isArray([1, 2])).toBe(true);
    });

    test('if the parametr is not an array', () => {
      expect(helpers.isArray('string')).toBe(false);
    });
  });


  describe('isBaseContainPxOrEm', () => {
    test('If contains pixels', () => {
      expect(helpers.isBaseContainPxOrEm('45px')).toBe(true);
    });

    test('If contains ems', () => {
      expect(helpers.isBaseContainPxOrEm('8.8em')).toBe(true);
    });

    test('The floating-point number does not contain the units of measure', () => {
      expect(helpers.isBaseContainPxOrEm('8.8rem')).toBe(false);
    });

    test('The number does not contain the units of measure', () => {
      expect(helpers.isBaseContainPxOrEm('9')).toBe(false);
    });
  });


  describe('isNumber', () => {
    test('If the parameter is a string', () => {
      expect(helpers.isNumber(1)).toBe(true);
    });

    test('If the parameter is not a string', () => {
      expect(helpers.isNumber([])).toBe(false);
    });

    test('If the parameter is not a string', () => {
      expect(helpers.isNumber(false)).toBe(false);
    });
  });
});

