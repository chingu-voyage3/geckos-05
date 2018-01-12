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
          <p>{ this.props.description }</p>
          <section className="resource-links">{ this.props.links }</section>
          <p><a href={this.props.url}>Github Link</a></p>
          <p><a href={this.props.homepage}>Live Link</a></p>
          <p>{ this.props.contributors.join(", ") }</p>
        </div>
      </div>
    )
  }
}
