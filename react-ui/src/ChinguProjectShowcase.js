import React, { Component } from 'react';
import Showcase from './showcase';
import './style/app.css';

export default class ChinguProjectShowcase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      activeProject: null,
      fetching: false
    }
  }

  // https://github.com/pksunkara/octonode
  fetchGithub = () => {
    fetch("https://api.github.com/orgs/chingu-voyage3/repos")
      .then(res => {
        if (!res.ok) {
          console.error("problem!", res.status);
        }
        // console.log(res);
        return res.json();
      })
      .then(json => {
        console.log(json);
        this.setState(prev => {
        if (prev.projects){
          return {
            projects: [...prev.projects, ...json]
          }
        } else {
          return {
            projects: json
          }
        }
        })
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

  // lifecycle methods
  componentDidMount() {
    this.fetchGithub();
  }

  render() {
    return (
      <div className="App">
        <Showcase/>
      </div>
    );
  }
}
