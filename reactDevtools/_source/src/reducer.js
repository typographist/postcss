import { combineReducers } from 'redux';
import verticalRhythm from './ducks/verticalRhythm';
import excludeReducer from './excludeReducer';

const rootReducer = combineReducers(
  excludeReducer(
    {
      exclude: verticalRhythm,
    },
    verticalRhythm,
  ),
);

export default rootReducer;
