import React, { Component } from 'react';

export default class UserAccount extends Component {
  render() {
    return (
      <div>
        My Id is: 
        <div>{ this.props.user }</div>
        <div>{ this.props.name }</div>
        <p>{ this.props.url }</p>
      </div>

    )
  }
}
