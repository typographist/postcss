const above = name => {
  const breakValue = getBreakpointValue(name);
  return `min-width: ${breakValue}`;
};

const below = name => {
  const nextBreakName = getBreakpointNext(name);

  try {
    if (nextBreakName) {
      const breakValue = getBreakpointMax(name);
      return `max-width: ${breakValue}`;
    }

    throw new Error(`${name} is iccorrect value! `);
  } catch (err) {
    console.log(err.message);
  }
};

const between = (lower, upper) => {
  const lowerBreak = getBreakpointValue(lower);
  const upperBreak = getBreakpointMax(upper);

  return `min-width: ${lowerBreak} max-width: ${upperBreak}`;
};

const only = name => {
  const lowerBreak = getBreakpointValue(name);
  const upperBreak = getBreakpointMax(name);

  return `min-width: ${lowerBreak} max-width: ${upperBreak}`;
};
