const getBase = require('../../helpers/getBase');
const toRem = require('./');

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

describe('toRem', () => {
  const base = getBase(breakpoints[0].base);
  it('should convert to rem', () => {
    expect(toRem(base, breakpoints[0].root)).toBe(1.3333333333333333);
  });
});

export default toRem;
