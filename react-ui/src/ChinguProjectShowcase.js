import React, { Component } from 'react';
import UserAccount from './user_account';
import Showcase from './showcase';
import './style/app.css';
import ProjectPopUp from './project.js';
import SearchBar from './search_bar.js'

export default class ChinguProjectShowcase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      activeProject: null,
      show: "showcase",
      perPage: 12,
      fetching: true
    }
  }

  // api calls
  // https://github.com/pksunkara/octonode
  fetchGithub = (org) => {
    fetch(`https://api.github.com/orgs/${org}/repos`)
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
            projects: [...prev.projects, ...json],
            fetching: false
          }
        } else {
          return {
            projects: json,
            fetching: false
          }
        }
        })
      })
  }

  // event handlers
  switchDisplay = display => {
  }

  toggleShowProject = projectId => {
    console.log(projectId);
    this.setState(prev => {
      if (prev.openProject === projectId) {
        return { openProject: null }
      }
      else return { openProject: projectId }
    })
  }

  // special render methods and data processing for rendering
  pageProjects = projects => {
    let page = 0;
    return projects.reduce((pages, project, i) => {
      page = Math.floor(i/12);
      // if it's the first pass on current page, prepare an empty array
      if (!pages[page]) { pages[page] = [] }
      pages[page].push(project);
      return pages;
    }, [])
  }

  renderProjectPage = projectId => {
    const project = this.state.projects.filter(project => {
      return project._id === projectId
    })[0];
    console.log(project);
    return (
      <div>
      <UserAccount
          // user={project[0].owner.login}
          // img_url={project[0].owner.avatar_url}
          picture="https://fthmb.tqn.com/O4_y2C8U4MO-f2uaeI-aHVf8eek=/768x0/filters:no_upscale()/about-blank-58824fe55f9b58bdb3b27e21.png"
        />
        <ProjectPopUp
          picture="https://fthmb.tqn.com/O4_y2C8U4MO-f2uaeI-aHVf8eek=/768x0/filters:no_upscale()/about-blank-58824fe55f9b58bdb3b27e21.png" //placeholder image
          name={ project.name }
          description={ project.description}
          url={ project.repo}
          contributors={project.contributors}
          // memberImg={project[0].owner.avatar_url}
          // owner= {project[0].owner.login}
          homepage = { project.demo }
          toggleShowProject={ () => this.toggleShowProject(project._id) }
         />
      </div>
    )
  }

  // lifecycle methods
  componentDidMount() {
    fetch("/api/projects", { "Accept": "application/json" })

      .then(res => {
        return res.json();
      })
      .then(data => {
        // console.log(data);
        this.setState({ projects: data, fetching: false });
      })
    // this.fetchGithub("chingu-coders");
  }

  render() {
    return (
      <div className="App">
        <div className="backdrop"></div>
        <div className="main-container">
          <div className="masthead-container">
            <h1 className="masthead">Chingu Project Showcase</h1>
          </div>
          <SearchBar
          />
          { this.state.fetching ?
              <p>Fetching project data...</p> :
              this.state.openProject ?
                this.renderProjectPage(this.state.openProject) :
                <Showcase
                  pages={ this.pageProjects(this.state.projects) }
                  toggleShowProject={ this.toggleShowProject }
                />
          }
        </div>
      </div>
    );
  }
}
