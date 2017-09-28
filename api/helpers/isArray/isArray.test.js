import isArray from './';

describe('isArray', () => {
  it('should be the array', () => {
    expect(isArray(['yep', 'yep'])).toBe(true);
  });

  it('should not be an array', () => {
    expect(isArray('fake')).toBe(false);
  });
});
