const getBreakpointsName = require('./').getBreakpointsName;
const getBreakpoints = require('./').getBreakpoints;
const setBreakpointName = require('./').setBreakpointName;

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

describe('makeBreakpoints', () => {
  describe('getBreakpointsName', () => {
    it('should get breakpoints name', () => {
      expect(getBreakpointsName(config)).toEqual([
        'tablet',
        'desktop',
        'lgDesktop',
        'xlDesktop',
      ]);
    });
  });

  describe('getBreakpoints', () => {
    it('should be if get brakpoints', () => {
      expect(getBreakpoints(config)).toEqual([
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

  describe('setBreakpointName', () => {
    it('should if set breakpoints name', () => {
      expect(setBreakpointName(
        getBreakpoints(config),
        getBreakpointsName(config),
      )).toEqual([
        {
          name: 'tablet',
          breakpoint: '640px',
          base: '17px',
        },
        {
          name: 'desktop',
          breakpoint: '1024px',
          base: '18px',
          lineHeight: 1.7,
          ratio: 1.333,
        },
        {
          name: 'lgDesktop',
          breakpoint: '1200px',
          base: '20px',
        },
        {
          name: 'xlDesktop',
          breakpoint: '1600px',
          base: '22px',
        },
      ]);
    });
  });
});
