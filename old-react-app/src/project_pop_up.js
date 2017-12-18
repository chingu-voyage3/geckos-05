import React, { Component } from 'react';
import './style/project_pop_up.css';

export default class ProjectPopUp extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    // other data: teams, votes, links, date added
    return (
      <div className="project-pop-up">
        <h2>{ this.props.name }</h2>
        <p>{ this.props.description}</p>
        <section className="resource-links">{ this.props.links }</section>
      </div>
    )
  }
}
