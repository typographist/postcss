module.exports = (store, config) => {
  const breakpoints = store(config);

  return breakpoints
    .filter(b => b.name !== 'default')
    .map(breakpoint => breakpoint.name);
};
