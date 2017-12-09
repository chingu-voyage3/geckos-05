import React, { Component } from 'react';
import './style/project_card.css';

export default class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="project-card" onClick={ this.props.togglePopUp }>
        <h3>{ this.props.name }</h3>
        <p>{ this.props.description }</p>
      </div>
    )
  }
}
