import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'

import { match, Router, Route, Link, browserHistory } from 'react-router';

import routes from './routes/root';

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

ReactDOM.render(
    routes,
    document.getElementById('root')
  )