const CONTAINS_PX = require('./').CONTAINS_PX;

describe('CONTAINS_PX', () => {
  it('should contains pixels', () => {
    expect(CONTAINS_PX.test('12px')).toBe(true);
  });

  it('should floating-point number contains pixels', () => {
    expect(CONTAINS_PX.test('567.88px')).toBe(true);
  });

  it('should does not contain pixels', () => {
    expect(CONTAINS_PX.test('12rem')).toBe(false);
  });

  it('should floating-point number does not contain pixels', () => {
    expect(CONTAINS_PX.test('12.34rem')).toBe(false);
  });
});
