import React, { Component } from 'react';

export default class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="project-card" onClick={ this.props.togglePopUp }>
        <h3>{ this.props.name }</h3>
        <h4>{ this.props.team }</h4>
        <p>{ this.props.description }</p>
        <p> {this.props.url }</p>
      </div>
    )
  }
}
