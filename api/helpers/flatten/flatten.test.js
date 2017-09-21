import flatten from './flatten';

describe('flatten', () => {
  it('should be if array of arrays', () => {
    expect(flatten([[1, 2], [3, 4], [5, 6]])).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should be if not array of arrays', () => {
    expect(flatten({})).toBe(false);
  });
});
