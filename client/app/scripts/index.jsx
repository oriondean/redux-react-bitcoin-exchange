import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './containers/app';
import configureStore from './store/store';

import '../css/app.css';

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  // eslint-disable-next-line
  document.getElementById('root'),
);
