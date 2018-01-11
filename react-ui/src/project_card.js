import React, { Component } from 'react';

export default class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div
        className="project-card"
        onClick={ e => {
          e.preventDefault();
          this.props.toggleShowProject(this.props._id);
        }}
      >
        <h3 className="project-heading">{ this.props.name }</h3>
        <p className="project-description">{ this.props.description }</p>
        <a href={ this.props.repo }>{ this.props.repo }</a>
      </div>
    )
  }
}
