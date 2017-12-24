const { CONTAINS_PX_OR_EM } = require('./');

describe('CONTAINS_PX_OR_EM', () => {
  it('should contains pixels', () => {
    expect(CONTAINS_PX_OR_EM.test('12px')).toBe(true);
  });

  it('should contains em', () => {
    expect(CONTAINS_PX_OR_EM.test('12em')).toBe(true);
  });

  it('should floating-point number contains pixels', () => {
    expect(CONTAINS_PX_OR_EM.test('678.999px')).toBe(true);
  });

  it('should floating-point number contains ems', () => {
    expect(CONTAINS_PX_OR_EM.test('12.34em')).toBe(true);
  });

  test('does not contain pixels or ems', () => {
    expect(CONTAINS_PX_OR_EM.test('12rem')).toBe(false);
  });

  test('floating-point number does not contain pixels or ems', () => {
    expect(CONTAINS_PX_OR_EM.test('12.34rem')).toBe(false);
  });
});
