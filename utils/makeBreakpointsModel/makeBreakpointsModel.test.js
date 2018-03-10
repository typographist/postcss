const {
  makeFirstBreakpoint,
  getNamesOfBreakpoints,
  makeBreakpoints,
  toPxValueOfBreakpoint,
  makeBreakpointsModel,
} = require('./');

const config = {
  base: '16px',
  lineHeight: 1.5,
  ratio: 1.066666667,
  tablet: {
    breakpoint: '640px',
    base: '17px',
  },
  desktop: {
    breakpoint: '1024px',
    base: '18px',
    lineHeight: 1.7,
    ratio: 1.333333333,
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

describe('makeBreakpointsModel', () => {
  describe('makeFirstBreakpoint function', () => {
    it('should array with object of first breakpoint', () => {
      expect(makeFirstBreakpoint(config)).toEqual([
        {
          base: '16px',
          lineHeight: 1.5,
          name: 'default',
          ratio: 1.066666667,
          value: '0px',
        },
      ]);
    });
  });

  describe('getNamesOfBreakpoints function', () => {
    it('should names of breakpoints', () => {
      expect(getNamesOfBreakpoints(config)).toEqual([
        'tablet',
        'desktop',
        'lgDesktop',
        'xlDesktop',
      ]);
    });
  });

  describe('makeBreakpoints function', () => {
    it('should an array with objects of breakpoints without first breakpoint', () => {
      expect(makeBreakpoints(config, getNamesOfBreakpoints)).toEqual([
        {
          base: '17px',
          name: 'tablet',
          value: '640px',
        },
        {
          base: '18px',
          lineHeight: 1.7,
          name: 'desktop',
          ratio: 1.333333333,
          value: '1024px',
        },
        {
          base: '20px',
          name: 'lgDesktop',
          value: '1200px',
        },
        {
          base: '22px',
          name: 'xlDesktop',
          value: '1600px',
        },
      ]);
    });
  });

  describe('toPxValueOfBreakpoint function', () => {
    it('should convert value of the breakpoint in pixels without units of measure', () => {
      expect(toPxValueOfBreakpoint('10em')).toBe(160);
    });
  });

  describe('makeBreakpointsModel function', () => {
    it('should an array with objects of breakpoints', () => {
      expect(makeBreakpointsModel(config)).toEqual([
        {
          base: 16,
          lineHeight: 1.5,
          name: 'default',
          ratio: 1.066666667,
          root: 12,
          value: '0px',
        },
        {
          base: 17,
          lineHeight: 1.5,
          name: 'tablet',
          ratio: 1.066666667,
          root: 13,
          value: '640px',
        },
        {
          base: 18,
          lineHeight: 1.7,
          name: 'desktop',
          ratio: 1.333333333,
          root: 16,
          value: '1024px',
        },
        {
          base: 20,
          lineHeight: 1.7,
          name: 'lgDesktop',
          ratio: 1.333333333,
          root: 17,
          value: '1200px',
        },
        {
          base: 22,
          lineHeight: 1.7,
          name: 'xlDesktop',
          ratio: 1.333333333,
          root: 19,
          value: '1600px',
        },
      ]);
    });
  });
});
