const calculator = require('./').calculator;
const calcFontSize = require('./').calcFontSize;

const breakpoints = [
  {
    root: 12,
    base: [16, 33],
    lineHeight: 1.5,
    ratio: 1.1880883987824906,
    value: '0px',
    name: 'default',
  },
  {
    root: 13,
    base: 17,
    name: 'tablet',
    value: '640px',
    lineHeight: 1.5,
    ratio: 1.1880883987824906,
  },
  {
    root: 16,
    base: 18,
    lineHeight: 1.7,
    ratio: 1.333,
    name: 'desktop',
    value: '1024px',
  },
  {
    root: 17,
    base: 20,
    name: 'lgDesktop',
    value: '1200px',
    lineHeight: 1.7,
    ratio: 1.333,
  },
  {
    root: 19,
    base: 22,
    name: 'xlDesktop',
    value: '1600px',
    lineHeight: 1.7,
    ratio: 1.333,
  },
];

describe('calculator', () => {
  it('should get font-size from 6 position', () => {
    expect(calculator(6, 12, 1.5)).toBe(137);
  });
});

describe('calcFontSize', () => {
  it('should the argument breakpointName is not specified', () => {
    expect(calcFontSize(6, breakpoints)).toBe('3.75rem');
  });

  it('should breakpoints name === tablet', () => {
    expect(calcFontSize(6, breakpoints, 'tablet')).toBe('3.6923076923076925rem');
  });

  it('should breakpoints name === desktop', () => {
    expect(calcFontSize(6, breakpoints, 'desktop')).toBe('6.3125rem');
  });

  it('should breakpoints name === lgDesktop', () => {
    expect(calcFontSize(6, breakpoints, 'lgDesktop')).toBe('6.588235294117647rem');
  });

  it('should breakpoints name === xlDesktop', () => {
    expect(calcFontSize(6, breakpoints, 'xlDesktop')).toBe('6.473684210526316rem');
  });
});

