import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader';
import Typographist from 'typographist-react-devtools';
import App from './App';
import './assets/styles/main.css';
import { IS_DEVELOPMENT } from '../tools/constants';

if (IS_DEVELOPMENT) import('typographist-react-devtools/devtools.css');

const { Switch, Debugger } = Typographist;

const Root = () => (
  <Fragment>
    <Typographist>
      <Switch />
      <Debugger>
        <App />
      </Debugger>
    </Typographist>
  </Fragment>
);

export default hot(module)(Root);
