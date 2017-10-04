import getFirstBase from './';

describe('getFirstBase', () => {
  it('should if base is array', () => {
    expect(getFirstBase([22, 11, 44])).toBe(22);
  });

  it('should if base is number', () => {
    expect(getFirstBase(456.1)).toBe(456.1);
  });
});
