import React, { Component } from 'react';
import ProjectCard from './project_card';

export default class Page extends Component {
  renderProjects = projects => {
    return projects.map(project => {
      return (
        <ProjectCard
          key={ project._id }
          _id={ project._id }
          name={ project.name }
          description={ project.description }
          toggleShowProject={ this.props.toggleShowProject }
          url= { project.html_url }
        />
      )
    })
  }

  render() {
    return (
      <div className="page">
          { this.renderProjects(this.props.projects) }
      </div>
    )
  }
}
