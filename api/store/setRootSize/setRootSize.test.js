const setRootSize = require('./');

const breakpoints = [
  {
    base: [16, 33],
    lineHeight: 1.5,
    ratio: 1.18809,
    value: '0px',
    name: 'default',
  },
  {
    base: 17,
    name: 'tablet',
    value: '640px',
    lineHeight: 1.5,
    ratio: 1.18809,
  },
  {
    base: 18,
    lineHeight: 1.7,
    ratio: 1.333,
    name: 'desktop',
    value: '1024px',
  },
  {
    base: 20,
    name: 'lgDesktop',
    value: '1200px',
    lineHeight: 1.7,
    ratio: 1.333,
  },
  {
    base: 22,
    name: 'xlDesktop',
    value: '1600px',
    lineHeight: 1.7,
    ratio: 1.333,
  },
];

const result = [
  {
    root: 12,
    base: [16, 33],
    lineHeight: 1.5,
    ratio: 1.18809,
    value: '0px',
    name: 'default',
  },
  {
    root: 13,
    base: 17,
    name: 'tablet',
    value: '640px',
    lineHeight: 1.5,
    ratio: 1.18809,
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

describe('setRootSize', () => {
  it('should set root size', () => {
    expect(setRootSize(breakpoints)).toEqual(result);
  });
});
