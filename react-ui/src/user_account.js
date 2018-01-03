import React, { Component } from 'react';


export default class UserAccount extends Component {
  render() {
    return (
      <div className="user_account">
        <p>You are logged in as: </p>
        <img className="icon-img" src={this.props.img_url} alt="." />
        <h3>{ this.props.user }</h3>
      </div>

    )
  }
}