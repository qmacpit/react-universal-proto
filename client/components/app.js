import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'

import { fetchData } from '../actions';

class App extends Component {
  
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchData());
  }

  componentWillReceiveProps(prev, next) {
    console.log(prev);
    console.log(next);
  }

  render() {
    console.log('rendering');
    if (this.state)
      console.log(this.state.data);
    if (this.props)
      console.log(this.props.data);
    return (
      <div>
        <h1>Hello, world!!!????</h1>
        <Link to='/details/1'>click</Link>
        {
          this.props && this.props.data
          ? (
            this.props.data.map((current, index) => {
              return <div key={index}>{current.data}</div>
            })
          )
          : ''
        }
      </div>
    );
  }
}

function mapStateToProps(state) {  
  return {
    data: state.loadData.data
  }
}

export default connect(mapStateToProps)(App)