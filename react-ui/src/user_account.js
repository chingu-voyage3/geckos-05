import React, { Component } from 'react';

export default class UserAccount extends Component {
  render() {
    return (
      <div>{ this.props.user }</div>
    )
  }
}
