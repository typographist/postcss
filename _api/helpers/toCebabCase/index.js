const toCababCase = string => (
  string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
);

module.exports = toCababCase;
