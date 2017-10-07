import makeDefaultBreakpoint from './';

const config = {
  base: ['16px', '33px'],
  lineHeight: 1.5,
  ratio: '45px at 6',
  tablet: {
    breakpoint: '640px',
    base: '17px',
  },
  desktop: {
    breakpoint: '1024px',
    base: '18px',
    lineHeight: 1.7,
    ratio: 1.333,
  },
  lgDesktop: {
    breakpoint: '1200px',
    base: '20px',
  },
  xlDesktop: {
    breakpoint: '1600px',
    base: '22px',
  },
};

describe('makeDefaultBreakpoint', () => {
  it('should make default breakpoint', () => {
    expect(makeDefaultBreakpoint(config)).toEqual({
      base: ['16px', '33px'],
      lineHeight: 1.5,
      ratio: '45px at 6',
      name: 'default',
      value: '0px',
    });
  });
});
