const flatten = array => (
  array.reduce((acc, item) => (
    [...acc, ...item]
  ))
);

export default flatten;

