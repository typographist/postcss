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

  describe('isBaseString', () => {
    test('if the parametr string', () => {
      expect(helpers.isBaseString('string')).toBe(true);
    });

    test('if the parametr is not an string', () => {
      expect(helpers.isBaseString(12)).toBe(false);
    });
  });

  describe('allBasesOfString', () => {
    test('all values are strings', () => {
      expect(helpers.allBasesOfString(['12px', '1'])).toBe(true);
    });

    test('one value is not a string', () => {
      expect(helpers.allBasesOfString([1, '124'])).toBe(false);
    });
  });
});

