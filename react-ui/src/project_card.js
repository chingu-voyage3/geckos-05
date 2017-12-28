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
        <h3>{ this.props.name }</h3>
        <p>{ this.props.description }</p>
      </div>
    )
  }
}
