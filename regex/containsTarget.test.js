const CONTAINS_TARGET = require('./').CONTAINS_TARGET;

describe('CONTAINS_TARGET', () => {
  it('should number after the word at', () => {
    expect('666px at 8'.match(CONTAINS_TARGET)).toEqual(['8']);
  });

  it('should negative number after the word at', () => {
    expect('666px at -8'.match(CONTAINS_TARGET)).toEqual(['-8']);
  });

  it('should floating-point number after the word at', () => {
    expect('666px at 8.777'.match(CONTAINS_TARGET)).toEqual(['8.777']);
  });

  it('should negative floating-point number after the word at', () => {
    expect('666px at -8.777'.match(CONTAINS_TARGET)).toEqual(['-8.777']);
  });

  it('should not support the units for the last found number', () => {
    expect('666px at -8.777px'.match(CONTAINS_TARGET)).toBe(null);
  });
});
