import { CONTAINS_PX } from './';

describe('CONTAINS_PX', () => {
  test('contains pixels', () => {
    expect(CONTAINS_PX.test('12px')).toBe(true);
  });

  test('floating-point number contains pixels', () => {
    expect(CONTAINS_PX.test('567.88px')).toBe(true);
  });

  test('does not contain pixels', () => {
    expect(CONTAINS_PX.test('12rem')).toBe(false);
  });

  test('floating-point number does not contain pixels', () => {
    expect(CONTAINS_PX.test('12.34rem')).toBe(false);
  });
});
