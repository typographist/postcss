import { CONTAINS_TARGET } from './constants';

describe('CONTAINS_TARGET', () => {
  test('Find the number after the word at', () => {
    expect('666px at 8'.match(CONTAINS_TARGET)).toEqual(['8']);
  });

  test('Find the negative number after the word at', () => {
    expect('666px at -8'.match(CONTAINS_TARGET)).toEqual(['-8']);
  });

  test('Find the floating-point number after the word at', () => {
    expect('666px at 8.777'.match(CONTAINS_TARGET)).toEqual(['8.777']);
  });

  test('find a negative floating-point number after the word at', () => {
    expect('666px at -8.777'.match(CONTAINS_TARGET)).toEqual(['-8.777']);
  });

  test('does not support the units for the last found number', () => {
    expect('666px at -8.777px'.match(CONTAINS_TARGET)).toBe(null);
  });
});