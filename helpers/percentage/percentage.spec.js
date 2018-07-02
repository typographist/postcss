const percentage = require('./');

describe('isObject', () => {
  it('should convert to percents', () => {
    expect(percentage(16)).toBe(100);
  });
});
