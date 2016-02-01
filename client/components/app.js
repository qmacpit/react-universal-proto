import React, { Component } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello, world!!!???</h1>
        <Link to='/details/1'>click</Link>
      </div>
    );
  }
}
