import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'

import { fetchData } from '../actions';

class App extends Component {
  
  componentDidMount() {
    const { dispatch } = this.props
    // dispatch(fetchData());
  }

  render() {
    return (
      <div>
        <h1>Hello, world!!!????</h1>
        <Link to='/details/1'>click</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {  
  return {
    data: state.data
  }
}

export default connect(mapStateToProps)(App)