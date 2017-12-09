import React, { Component } from 'react';
import './style/leaderboard.css';
import ProjectCard from './project_card';
import ProjectPopUp from './project_pop_up';
import DATA from './data';

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      openProject: null
    }
  }


  // lifecycle methods
  componentDidMount() {
    this.setState(prev => {
      const projects = [ ...prev.projects, ...DATA];
      return { projects }
    })
  }

  // event handlers
  toggleProject = (projectID) => {
    this.setState(prev => {
      if (prev.openProject === projectID) {
        return { openProject: null }
      }
      else return { openProject: projectID }
    })
  }

  // render functions
  renderProjects = projects => {
    return projects.map(project => {
      // console.log(project);
      return (
        <ProjectCard
          key={ project.id }
          id={ project.id }
          name={ project.name }
          description={ project.description }
          togglePopUp={ () => this.toggleProject(project.id) }
        />
      )
    })
  }

  renderPopUp = id => {
    const project = this.state.projects.filter(proj => {
      return proj.id === id
    })[0];
    return (
      <ProjectPopUp
        name={ project.name }
        description={ project.description }
      />
    )
  }

  render() {
    return (
      <div className="leaderboard">
        { this.renderProjects(this.state.projects) }
        { this.state.openProject && this.renderPopUp(this.state.openProject) }
      </div>
    )
  }
}
