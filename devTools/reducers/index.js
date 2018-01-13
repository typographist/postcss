const verticalRhythm = (state = 'offRhythm', action) => {
  switch (action.type) {
    case 'TOGGLE_RHYTHM':
      switch (state) {
        case 'offRhythm':
          return 'singleRhythm';
        case 'singleRhythm':
          return 'doubleRhythm';
        case 'doubleRhythm':
          return 'offRhythm';
        default:
          return state;
      }
    case 'SET_RHYTHM':
      return action.rhythm;
    default:
      return state;
  }
};

module.exports = verticalRhythm;
