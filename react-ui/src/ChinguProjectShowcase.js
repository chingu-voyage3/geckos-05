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
      return project.id === projectId
    });
<<<<<<< HEAD
   
=======

>>>>>>> c3445e9519108dfc2b7632fb6e7043d3ea029813
    console.log(project);

    return (
      <div>
<<<<<<< HEAD
      <UserAccount 
          user={project[0].owner.login}
          img_url={project[0].owner.avatar_url}
          picture="https://fthmb.tqn.com/O4_y2C8U4MO-f2uaeI-aHVf8eek=/768x0/filters:no_upscale()/about-blank-58824fe55f9b58bdb3b27e21.png" 
        /> 
        <ProjectPopUp 
=======
      <UserAccount
          user={project[0].owner.login}
          img_url={project[0].owner.avatar_url}
          picture="https://fthmb.tqn.com/O4_y2C8U4MO-f2uaeI-aHVf8eek=/768x0/filters:no_upscale()/about-blank-58824fe55f9b58bdb3b27e21.png"
        />
        <ProjectPopUp
>>>>>>> c3445e9519108dfc2b7632fb6e7043d3ea029813
          picture="https://fthmb.tqn.com/O4_y2C8U4MO-f2uaeI-aHVf8eek=/768x0/filters:no_upscale()/about-blank-58824fe55f9b58bdb3b27e21.png" //placeholder image
          name={ project[0].name }
          description={ project[0].description}
          url={ project[0].html_url}
          contributors={project[0].contributors_url}
          memberImg={project[0].owner.avatar_url}
          owner= {project[0].owner.login}
          homepage = { project[0].homepage }
         />
      </div>
    )
<<<<<<< HEAD
  } 
=======
  }
>>>>>>> c3445e9519108dfc2b7632fb6e7043d3ea029813

  whichDisplay = display => {
    return (
      display === "user" ?
        <UserAccount user={ this.state.user } /> :
        <Showcase
          pages={ this.pageProjects(this.state.projects) }
          toggleShowProject={ this.toggleShowProject }
        />
    )
  }

  // lifecycle methods
  componentDidMount() {
    this.fetchGithub("chingu-coders");
  }

  render() {
    return (
      <div className="App">
        <button onClick={ this.logout }>Logout</button>
        <button onClick={ () => this.switchDisplay("showcase") }>Projects</button>
        <button onClick={ () => this.switchDisplay("user") }>
          { this.state.user && this.state.user.name }
        </button>
<<<<<<< HEAD
        <SearchBar 
=======
        <SearchBar
>>>>>>> c3445e9519108dfc2b7632fb6e7043d3ea029813
        />
        { this.state.fetching ?
            <p>Fetching project data...</p> :
            this.state.openProject ?
              this.renderProjectPage(this.state.openProject) :
              this.whichDisplay(this.state.show)
        }
      </div>
    );
  }
}
