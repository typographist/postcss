import { CONTAINS_AT } from './constants';

describe('CONTAINS_AT', () => {
  test(`The string corresponds to a 
        positive / positive floating-point and pixel 
        or em format as units of measurement, 
        a space, a word at, a space, 
        a negative / positive floating-point number without units of measure.`, () => {
      expect(CONTAINS_AT.test('123px at 7')).toBe(true);
    });

  test('The first value contains the pixels', () => {
    expect(CONTAINS_AT.test('123px at 7')).toBe(true);
  });

  test('The first value contains the ems', () => {
    expect(CONTAINS_AT.test('123em at 7')).toBe(true);
  });

  test('The first number does not contain the units of measure.', () => {
    expect(CONTAINS_AT.test('123 at 7')).toBe(false);
  });

  test('The last value has units of measure', () => {
    expect(CONTAINS_AT.test('123px at 7px')).toBe(false);
  });
});