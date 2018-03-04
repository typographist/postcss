const { HAS_PX_OR_EM } = require('./');

describe('HAS_PX_OR_EM', () => {
  it('should has pixels', () => {
    expect(HAS_PX_OR_EM.test('12px')).toBe(true);
  });

  it('should has em', () => {
    expect(HAS_PX_OR_EM.test('12em')).toBe(true);
  });

  it('should floating-point number has pixels', () => {
    expect(HAS_PX_OR_EM.test('678.999px')).toBe(true);
  });

  it('should floating-point number has ems', () => {
    expect(HAS_PX_OR_EM.test('12.34em')).toBe(true);
  });

  test('does not contain pixels or ems', () => {
    expect(HAS_PX_OR_EM.test('12rem')).toBe(false);
  });

  test('floating-point number does not contain pixels or ems', () => {
    expect(HAS_PX_OR_EM.test('12.34rem')).toBe(false);
  });
});
