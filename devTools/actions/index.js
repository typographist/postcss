const toggleRhythm = () => ({
  type: 'TOGGLE_RHYTHM',
});

const setRhythm = rhythm => ({
  type: 'SET_RHYTHM',
  rhythm,
});

module.exports = {
  toggleRhythm,
  setRhythm,
};
