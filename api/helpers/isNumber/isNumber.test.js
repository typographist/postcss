import isNumber from './isNumber';

describe('isNumber', () => {
  it('should be number', () => {
    expect(isNumber(1)).toBe(true);
  });

  it('should not be not number', () => {
    expect(isNumber([])).toBe(false);
  });
});
