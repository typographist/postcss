const { POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER } = require('./');

describe('FLOATING_POINT_NUMBER', () => {
  it('should integer support', () => {
    expect(POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER.test('12')).toBe(true);
  });

  it('should floating points support', () => {
    expect(POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER.test('1.2')).toBe(true);
  });

  it('should negative meaning', () => {
    expect(POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER.test('-7')).toBe(true);
  });

  it('should invalid number', () => {
    expect(POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER.test('1....2')).toBe(
      false,
    );
  });

  it('should negative floating point', () => {
    expect(POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER.test('-7.777')).toBe(
      true,
    );
  });

  it('should not a number', () => {
    expect(POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER.test('myNameIsMax')).toBe(
      false,
    );
  });

  it('should not a number', () => {
    expect(POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER.test('myNameIsMax')).toBe(
      false,
    );
  });
});
