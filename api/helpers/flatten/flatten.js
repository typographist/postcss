const flatten = array => (
  array.reduce((acc, item) => (
    acc.concat(item)
  ), [])
);

export default flatten;

