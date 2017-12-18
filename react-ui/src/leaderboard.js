import React, { Component } from 'react';
import './style/leaderboard.css';
import ProjectCard from './project_card';
import ProjectPopUp from './project_pop_up';

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
    fetch("/api/projects", { "Accept": "application/json"})
      .then(res => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else throw new Error(`response error: status ${res.status}`);
      })
      .then(res => {
        this.setState(prev => {
          if (res.projects) {
            return { projects: [ ...prev.projects, ...res.projects ] };
          } else if (prev.projects && prev.projects.length !== 0) {
            return
          } else {
            console.log("this is not the data you're looking for");
            return { noData: true };
          }
        })
      })
      .catch(err => {
        alert("Uh-oh. No data retrieved from server");
        this.setState(prev => {
          console.log(prev.projects, prev.projects.length);
          return (!prev.projects || prev.projects.length === 0) ?
            { noData: true } : null;
        });
      })
  }

  // event handlers
  toggleProject = projectID => {
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
      return (
        <ProjectCard
          key={ project.uniqueID }
          id={ project.uniqueID }
          name={ project.name }
          team={ project.team }
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
        { this.state.noData ?
          <p style={ {background: "#f66", padding: "1rem"} }>Sorry, no project data found</p> :
          this.renderProjects(this.state.projects) }
        { this.state.openProject && this.renderPopUp(this.state.openProject) }
      </div>
    )
  }
}
