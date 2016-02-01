import React, { Component } from 'react';
import { Link } from 'react-router';

export default class DetailsComponent extends Component {
  render() {    
    return (
      <div>
        <h1>This is stats!!!???</h1>   
        <h3>{this.props.params.id}</h3>     
      </div>      
    );
  }
}