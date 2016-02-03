import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { match, Router, Route, Link, browserHistory } from 'react-router';

import routes from './routes/root';
import configureStore from './store/dataStore'

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`
const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
      {routes}
    </Provider>,
    document.getElementById('root')
  )