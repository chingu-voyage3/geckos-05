import React, { Component } from 'react';
import ProjectCard from './project_card';

export default class Page extends Component {
  renderProjects = projects => {
    return projects.map(project => {
      return (
        <ProjectCard
          key={ project.id }
          name={ project.name }
          description={ project.description }
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
