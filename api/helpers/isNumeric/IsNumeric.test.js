import isNumeric from './isNumeric';

describe('isNumeric', () => {
  it('it should be a number', () => {
    expect(isNumeric(888)).toBe(true);
  });

  it('it should be a not a number', () => {
    expect(isNumeric(NaN)).toBe(false);
  });

  it('it should be a not a number', () => {
    expect(isNumeric(false)).toBe(false);
  });

  it('it should be a not a number', () => {
    expect(isNumeric(Infinity)).toBe(false);
  });
});
