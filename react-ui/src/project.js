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
        <div>
          <img src={ this.props.picture } alt="." />
          <h2>Project Name: { this.props.name }</h2>
          <p>Description: { this.props.description }</p>
          <section className="resource-links">{ this.props.links }</section>
          <a href={this.props.url}>Project Link </a>
          <p> Team Members in Group: { this.props.contributors } </p>
        </div>
        <a href="/" > <button> Back </button></a>
      </div>
    )
  }
}
