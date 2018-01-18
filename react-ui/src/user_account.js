import React, { Component } from 'react';


export default class UserAccount extends Component {
  render() {
    return (
      <div className="user_account">
        <div>
          <p>You are logged in as: </p>
          <img className="icon-img" src={this.props.img_url} alt="." />
          <h3>{ this.props.user }</h3>
        </div>
        <div className="project_container">
          <p>My Most Recent Project:</p>
          <img className="user_project" src={ this.props.picture } alt="user"/>
        </div>
      </div>

    )
  }
}