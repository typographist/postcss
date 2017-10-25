const FLOATING_POINT_NUMBER = require('./').FLOATING_POINT_NUMBER;

describe('FLOATING_POINT_NUMBER', () => {
  test('integer support', () => {
    expect(FLOATING_POINT_NUMBER.test('12')).toBe(true);
  });

  test('floating points support', () => {
    expect(FLOATING_POINT_NUMBER.test('1.2')).toBe(true);
  });

  test('negative meaning', () => {
    expect(FLOATING_POINT_NUMBER.test('-7')).toBe(true);
  });

  test('negative floating-point value', () => {
    expect(FLOATING_POINT_NUMBER.test('-7.777')).toBe(true);
  });

  test('not a number', () => {
    expect(FLOATING_POINT_NUMBER.test('myNameIsMax')).toBe(false);
  });
});
