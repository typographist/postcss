const getBase = require('./');

describe('getBase', () => {
  it('should if base is array', () => {
    expect(getBase([22, 11, 44])).toBe(22);
  });

  it('should if base is number', () => {
    expect(getBase(456.1)).toBe(456.1);
  });
});
