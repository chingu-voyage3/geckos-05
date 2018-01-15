import React, { Component } from 'react';
import OnClickOverlay from './on_click_overlay';

export default class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div
        className="project-card"
      >
        <h3 className="project-heading">{ this.props.name }</h3>
        <p className="project-description">{ this.props.description }</p>
        <OnClickOverlay handleOnClick={ () => this.props.toggleShowProject(this.props._id) } />
        <a href={ this.props.repo }>{ this.props.repo }</a>
      </div>
    )
  }
}
