'use strict';
import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { routes } from '../routes';
import configureStore from '../shared/store/configureStore';
import { browserHistory } from 'react-router';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('app')
)

