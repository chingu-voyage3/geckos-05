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
          repo={ project.repo }
          toggleShowProject={ this.props.toggleShowProject }
          url= { project.html_url }
        />
      )
    })
  }

  render() {
    return (
      <div className="page">
        { this.props.projects ?
            this.renderProjects(this.props.projects) :
            <h2 className="no-projects-found">Sorry, no projects found</h2>
        }
      </div>
    )
  }
}
