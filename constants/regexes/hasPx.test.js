const { HAS_PX } = require('./');

describe('HAS_PX', () => {
  it('should has pixels', () => {
    expect(HAS_PX.test('12px')).toBe(true);
  });

  it('should floating-point number has pixels', () => {
    expect(HAS_PX.test('567.88px')).toBe(true);
  });

  it('should does not contain pixels', () => {
    expect(HAS_PX.test('12rem')).toBe(false);
  });

  it('should floating-point number does not contain pixels', () => {
    expect(HAS_PX.test('12.34rem')).toBe(false);
  });
});
