import * as validators from './breakpointsValidator';

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

const breakpoints = [
  {
    breakpoint: '640px',
    base: '17px',
  },
  {
    breakpoint: '1024px',
    base: '18px',
    lineHeight: 1.7,
    ratio: 1.333,
  },
  {
    breakpoint: '1200px',
    base: '20px',
  },
  {
    breakpoint: '1600px',
    base: '22px',
  },
];

const breakpoint = {
  breakpoint: '640px',
  base: '17px',
};

describe('breakpointIsString', () => {
  it('should be if string', () => {
    expect(validators.breakpointIsString('bam baaaam!')).toBe(true);
  });

  it('should be if not a string', () => {
    expect(validators.breakpointIsString(NaN)).toBe(false);
  });
});


describe('isBreakpointContainsPxOrEm', () => {
  it('should be constains px', () => {
    expect(validators.isBreakpointContainsPxOrEm('777px')).toBe(true);
  });

  it('should be contains contains em', () => {
    expect(validators.isBreakpointContainsPxOrEm('77.7em')).toBe(true);
  });

  it('should be if not contains px or ems', () => {
    expect(validators.isBreakpointContainsPxOrEm('77.055llem')).toBe(false);
  });
});


describe('isValidBreakpoints', () => {
  it('should be if all breakpoints is a strings', () => {
    expect(validators.isValidBreakpoints(
      ['string', 'number', 'otherValue'],
      validators.breakpointIsString)).toBe(true);
  });

  it('should be if all brekapoints contains px or ems', () => {
    expect(validators.isValidBreakpoints(
      ['12px', '34px', '56em'],
      validators.isBreakpointContainsPxOrEm,
    )).toBe(true);
  });

  it('should if all breakpoints contains breakpoint key', () => {
    expect(validators.isValidBreakpoints(
      breakpoints,
      validators.checkContainsBreakpointKey,
    )).toBe(true);
  });


  describe('getBreakpoints', () => {
    it('should get breakpoints', () => {
      expect(validators.getBreakpoints(config)).toEqual([
        {
          breakpoint: '640px',
          base: '17px',
        },
        {
          breakpoint: '1024px',
          base: '18px',
          lineHeight: 1.7,
          ratio: 1.333,
        },
        {
          breakpoint: '1200px',
          base: '20px',
        },
        {
          breakpoint: '1600px',
          base: '22px',
        },
      ]);
    });
  });


  describe('checkContainsBreakpointKey', () => {
    it('should if is breakpoint contains breakpoint key', () => {
      expect(validators.checkContainsBreakpointKey(breakpoint)).toBe(true);
    });
  });


  describe('', () => {

  });
});
