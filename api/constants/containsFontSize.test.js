import { CONTAINS_FONT_SIZE } from './constants';

describe('CONTAINS_FONT_SIZE', () => {
  test('Find the first value in the line containing the pixels', () => {
    expect('666px at 8'.match(CONTAINS_FONT_SIZE)).toEqual(['666px']);
  });

  test('Find the first value in the line containing the ems', () => {
    expect('666em at 8'.match(CONTAINS_FONT_SIZE)).toEqual(['666em']);
  });

  test('The first value is a floating-point number', () => {
    expect('6.66px at 8'.match(CONTAINS_FONT_SIZE)).toEqual(['6.66px']);
  });

  test('The first value is a negative floating-point number', () => {
    expect('-6.66px at 8'.match(CONTAINS_FONT_SIZE)).toEqual(['6.66px']);
  });

  test('The first value in the string does not contain pixels or ems', () => {
    expect('666rem at 8'.match(CONTAINS_FONT_SIZE)).toBe(null);
  });
});
