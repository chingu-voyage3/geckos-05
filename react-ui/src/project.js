import React, { Component } from 'react';


export default class ProjectPopUp extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {
    // other data: teams, votes, links, date added
    return (
      <div className="project-pop-up">
        <h2 className="project-heading">{ this.props.name }
          <button className="btn close-btn close-project-btn" onClick={ this.props.toggleShowProject }>&times;</button>
        </h2>
        <div className="project-content">
          <img src={ this.props.picture } alt="." />
          <p>Description: { this.props.description }</p>
          <section className="resource-links">{ this.props.links }</section>
          <a href={this.props.url}>Github Link</a>
          <a href={this.props.homepage}>Live Link</a>
          <p>Team Members in Group: { this.props.contributors }</p>
        </div>
      </div>
    )
  }
}
