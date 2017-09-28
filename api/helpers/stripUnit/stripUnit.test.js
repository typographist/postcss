import stripUnit from './';

describe('stripUnit', () => {
  it('should if base is string in px', () => {
    expect(stripUnit('16px')).toBe(16);
  });

  it('should if base array of strings', () => {
    expect(stripUnit(['16px', '33px'])).toEqual([16, 33]);
  });

  it('should if base in ems', () => {
    expect(stripUnit('2em')).toBe(32);
  });
});
