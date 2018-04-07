// Action Typs
const TOGGLE_RHYTHM = 'TYPOGRAPHIST/RHYTHM_TOGGLE_BUTTON/TOGGLE_RHYTHM';
const TOGGLE_FLUID_RHYTHM =
  'TYPOGRAPHIST/RHYTHM_TOGGLE_BUTTON/TOGGLE_FLUID_RHYTHM';
const SET_RHYTHM = 'TYPOGRAPHIST/RHYTHM_TOGGLE_BUTTON/SET_RHYTHM';

// Action Creators
export const toggleRhythm = () => ({ type: TOGGLE_RHYTHM });

export const toggleFluidRhythm = () => ({ type: TOGGLE_FLUID_RHYTHM });

export const setRhythm = rhythm => ({ type: SET_RHYTHM, rhythm });

// Reducer
const initialState = {
  rhythm: 'offRhythm',
};

const verticalRhythm = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_RHYTHM:
      switch (state.rhythm) {
        case 'offRhythm':
          return {
            ...state,
            rhythm: 'singleRhythm',
          };
        case 'singleRhythm':
          return {
            ...state,
            rhythm: 'doubleRhythm',
          };
        case 'doubleRhythm':
          return {
            ...state,
            rhythm: 'offRhythm',
          };
        default:
          return state;
      }

    case TOGGLE_FLUID_RHYTHM:
      switch (state.verticalRhythm.rhythm) {
        case 'offRhythm':
          return {
            ...state,
            rhythm: 'singleRhythm',
          };
        case 'singleRhythm':
          return 'offRhythm';
        default:
          return {
            ...state,
            rhythm: 'offRhythm',
          };
      }
    case SET_RHYTHM:
      return action.rhythm;
    default:
      return state;
  }
};

export default verticalRhythm;
