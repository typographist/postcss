import toEm from './';

describe('toEm', () => {
  it('should if px', () => {
    expect(toEm('16px')).toBe(1);
  });
});
