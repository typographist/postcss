import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { hot } from 'react-hot-loader';
import rootReducer from '../reducer';
import Typographist from '../containers/Typographist';
import RhythmToggle from '../containers/RhythmToggleButton';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    // applyMiddleware(...your middleware)
    applyMiddleware(),
    // other store enhancers if any
  ),
);

const Root = () => (
  <Provider store={store}>
    <Typographist className="test">
      <RhythmToggle />
    </Typographist>
  </Provider>
);

export default hot(module)(Root);
