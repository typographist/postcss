import flatten from './flatten';

describe('flatten', () => {
  it('should be if array of arrays', () => {
    expect(flatten([['16px', '33px'], '17px', '18px', '20px', '22px'])).toEqual(['16px', '33px', '17px', '18px', '20px', '22px']);
  });
});
