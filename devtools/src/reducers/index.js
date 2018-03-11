const verticalRhythm = (state = 'offRhythm', action) => {
  switch (action.type) {
    case 'TOGGLE_ADAPTIVE_RHYTHM':
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

    case 'TOGGLE_FLUID_RHYTHM':
      switch (state) {
        case 'offRhythm':
          return 'singleRhythm';
        case 'singleRhythm':
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

export default verticalRhythm;
