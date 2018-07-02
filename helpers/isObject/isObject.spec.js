const isObject = require('./');

describe('isObject', () => {
  it('should be the object', () => {
    expect(isObject({ value: 1 })).toBe(true);
  });

  it('should not be an object', () => {
    expect(isObject('fake')).toBe(false);
  });
});
