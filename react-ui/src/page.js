import React, { Component } from 'react';
import ProjectCard from './project_card';

export default class Page extends Component {
  renderProjects = projects => {
    return projects.map(project => {
      return (
        <ProjectCard
          key={ project.id }
          _id={ project.id }
          name={ project.name }
          description={ project.description }
          toggleShowProject={ this.props.toggleShowProject }
        />
      )
    })
  }

  render() {
    return (
      <div>
        { this.renderProjects(this.props.projects) }
      </div>
    )
  }
}
