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
          <p className="project-description">{ this.props.description }</p>
          <section className="resource-links">{ this.props.links }</section>
          <p>
            <a
              className="project-link repo-link"
              href={this.props.url}
              target="_blank"
            >{ this.props.url }</a>
          </p>
          { this.props.homepage && <p><a className="project-link demo-link" href={this.props.homepage}>{ this.props.homepage }</a></p>}
          <p className="contributors-list">{ this.props.contributors.join(", ") }</p>
        </div>
      </div>
    )
  }
}
