import React, { Component } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux'

import { fetchDetails, findDataElementById } from '../actions';

class DetailsComponent extends Component {

  componentDidMount() {
    // console.log('details mounted')
    // console.log(this.props)    
    const { dispatch } = this.props
    const { id } = this.props.params
    dispatch(fetchDetails(parseInt(id)));
  }

  render() {        
    let element = findDataElementById(
      parseInt(this.props.params.id),
      this.props.data
    )
    console.log('details')
    console.log(element)
    console.log(this.props.data)
    return (
      <div>
        <h1>This is details!!!???</h1>   
        {
          element && element.details
          ? (
            <div>
              <h3>{element.details.id}</h3>     
              <h3>{element.details.data}</h3>     
            </div>
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

export default connect(mapStateToProps)(DetailsComponent)