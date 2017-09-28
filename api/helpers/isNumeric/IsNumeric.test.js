import isNumeric from './';

describe('isNumeric', () => {
  it('should if number', () => {
    expect(isNumeric(14.88)).toBe(true);
  });

  it('should if string contains number', () => {
    expect(isNumeric('111')).toBe(true);
  });

  it('should if string contains number with units', () => {
    expect(isNumeric('56.78px')).toBe(false);
  });

  it('should if not a number', () => {
    expect(isNumeric(NaN)).toBe(false);
  });

  it('should if boolean', () => {
    expect(isNumeric(false)).toBe(false);
  });

  it('should if Infinity number', () => {
    expect(isNumeric(Infinity)).toBe(false);
  });
});
