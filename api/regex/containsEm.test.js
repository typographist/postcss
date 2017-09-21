import { CONTAINS_EM } from './constants';

describe('CONTAINS_EM', () => {
  test('contains ems', () => {
    expect(CONTAINS_EM.test('12em')).toBe(true);
  });

  test('floating-point number contains ems', () => {
    expect(CONTAINS_EM.test('567.89em')).toBe(true);
  });

  test('does not contain pixels', () => {
    expect(CONTAINS_EM.test('12rem')).toBe(false);
  });

  test('floating-point number does not contain pixels', () => {
    expect(CONTAINS_EM.test('99.2rem')).toBe(false);
  });
});
