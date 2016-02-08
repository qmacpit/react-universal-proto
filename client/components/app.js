import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'

import { fetchData } from '../actions';

class App extends Component {
  
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchData());
  }

  getDatailsLink(current) {
    return `/details/${current.id}`;
  }

  render() {
    return (
      <div>
        <h1>Hello, world!!!</h1>        
        {
          this.props && this.props.data
          ? (
            this.props.data.map((current, index) => {
              return (
                <div key={index}>
                  <Link to={this.getDatailsLink(current)}>{current.data}</Link>
                </div>
              )
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