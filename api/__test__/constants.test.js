import * as constants from '../constants';

describe('constants', () => {
  describe('FLOATING_POINT_NUMBER', () => {
    test('integer support', () => {
      expect(constants.FLOATING_POINT_NUMBER.test('12')).toBe(true);
    });

    test('floating points support', () => {
      expect(constants.FLOATING_POINT_NUMBER.test('1.2')).toBe(true);
    });

    test('negative meaning', () => {
      expect(constants.FLOATING_POINT_NUMBER.test('-7')).toBe(true);
    });

    test('negative floating-point value', () => {
      expect(constants.FLOATING_POINT_NUMBER.test('-7.777')).toBe(true);
    });

    test('not a number', () => {
      expect(constants.FLOATING_POINT_NUMBER.test('myNameIsMax')).toBe(false);
    });
  });

  describe('CONTAINS_PX', () => {
    test('contains pixels', () => {
      expect(constants.CONTAINS_PX.test('12px')).toBe(true);
    });

    test('floating-point number contains pixels', () => {
      expect(constants.CONTAINS_PX.test('567.88px')).toBe(true);
    });

    test('does not contain pixels', () => {
      expect(constants.CONTAINS_PX.test('12rem')).toBe(false);
    });

    test('floating-point number does not contain pixels', () => {
      expect(constants.CONTAINS_PX_OR_EM.test('12.34rem')).toBe(false);
    });
  });

  describe('CONTAINS_EM', () => {
    test('contains ems', () => {
      expect(constants.CONTAINS_EM.test('12em')).toBe(true);
    });

    test('floating-point number contains ems', () => {
      expect(constants.CONTAINS_EM.test('567.89em')).toBe(true);
    });

    test('does not contain pixels', () => {
      expect(constants.CONTAINS_EM.test('12rem')).toBe(false);
    });

    test('floating-point number does not contain pixels', () => {
      expect(constants.CONTAINS_EM.test('99.2rem')).toBe(false);
    });
  });

  describe('CONTAINS_PX_OR_EM', () => {
    test('contains pixels', () => {
      expect(constants.CONTAINS_PX_OR_EM.test('12px')).toBe(true);
    });

    test('contains em', () => {
      expect(constants.CONTAINS_PX_OR_EM.test('12em')).toBe(true);
    });

    test('floating-point number contains pixels', () => {
      expect(constants.CONTAINS_PX_OR_EM.test('678.999px')).toBe(true);
    });

    test('floating-point number contains ems', () => {
      expect(constants.CONTAINS_PX_OR_EM.test('12.34em')).toBe(true);
    });

    test('does not contain pixels or ems', () => {
      expect(constants.CONTAINS_PX_OR_EM.test('12rem')).toBe(false);
    });

    test('floating-point number does not contain pixels or ems', () => {
      expect(constants.CONTAINS_PX_OR_EM.test('12.34rem')).toBe(false);
    });
  });

  describe('CONTAINS_AT', () => {
    test(`The string corresponds to a 
          positive / positive floating-point and pixel 
          or em format as units of measurement, 
          a space, a word at, a space, 
          a negative / positive floating-point number without units of measure.`, () => {
      expect(constants.CONTAINS_AT.test('123px at 7')).toBe(true);
    });

    test('The first value contains the pixels', () => {
      expect(constants.CONTAINS_AT.test('123px at 7')).toBe(true);
    });

    test('The first value contains the ems', () => {
      expect(constants.CONTAINS_AT.test('123em at 7')).toBe(true);
    });

    test('The first number does not contain the units of measure.', () => {
      expect(constants.CONTAINS_AT.test('123 at 7')).toBe(false);
    });

    test('The last value has units of measure', () => {
      expect(constants.CONTAINS_AT.test('123px at 7px')).toBe(false);
    });
  });

  describe('CONTAINS_FONT_SIZE', () => {
    test('Find the first value in the line containing the pixels', () => {
      expect('666px at 8'.match(constants.CONTAINS_FONT_SIZE)).toEqual(['666px']);
    });

    test('Find the first value in the line containing the ems', () => {
      expect('666em at 8'.match(constants.CONTAINS_FONT_SIZE)).toEqual(['666em']);
    });

    test('The first value is a floating-point number', () => {
      expect('6.66px at 8'.match(constants.CONTAINS_FONT_SIZE)).toEqual(['6.66px']);
    });

    test('The first value is a negative floating-point number', () => {
      expect('-6.66px at 8'.match(constants.CONTAINS_FONT_SIZE)).toEqual(['6.66px']);
    });

    test('The first value in the string does not contain pixels or ems', () => {
      expect('666rem at 8'.match(constants.CONTAINS_FONT_SIZE)).toBe(null);
    });
  });

  describe('CONTAINS_TARGET', () => {
    test('Find the number after the word at', () => {
      expect('666px at 8'.match(constants.CONTAINS_TARGET)).toEqual(['8']);
    });

    test('Find the negative number after the word at', () => {
      expect('666px at -8'.match(constants.CONTAINS_TARGET)).toEqual(['-8']);
    });

    test('Find the floating-point number after the word at', () => {
      expect('666px at 8.777'.match(constants.CONTAINS_TARGET)).toEqual(['8.777']);
    });

    test('find a negative floating-point number after the word at', () => {
      expect('666px at -8.777'.match(constants.CONTAINS_TARGET)).toEqual(['-8.777']);
    });

    test('does not support the units for the last found number', () => {
      expect('666px at -8.777px'.match(constants.CONTAINS_TARGET)).toBe(null);
    });
  });
});
