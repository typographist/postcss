const CONTAINS_EM = require('./').CONTAINS_EM;

describe('CONTAINS_EM', () => {
  it('should contains ems', () => {
    expect(CONTAINS_EM.test('12em')).toBe(true);
  });

  it('should floating-point number contains ems', () => {
    expect(CONTAINS_EM.test('567.89em')).toBe(true);
  });

  it('should does not contain pixels', () => {
    expect(CONTAINS_EM.test('12rem')).toBe(false);
  });

  it('should floating-point number does not contain pixels', () => {
    expect(CONTAINS_EM.test('99.2rem')).toBe(false);
  });
});
