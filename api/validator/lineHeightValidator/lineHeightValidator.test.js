const lineHeight = require('./');

describe('LineHeight', () => {
  it('should be array of numbers', () => {
    expect(lineHeight([1, 2, 3, 4])).toBe(true);
  });

  it('should not be not array of numbers', () => {
    expect(lineHeight(['fake', true, 123, {}])).toBe(false);
  });
});
