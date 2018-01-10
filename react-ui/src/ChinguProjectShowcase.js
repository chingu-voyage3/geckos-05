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
      fetching: true,
      term: ""
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

  onInputChange = term => {
    this.setState({
      term: term
    })
  };
  
  renderProjectPage = projectId => {
    const project = this.state.projects.filter(project => {
      return project._id === projectId
    });

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
          name={ project[0].name }
          description={ project[0].description}
          url={ project[0].repo}
          contributors={project[0].contributors}
          // memberImg={project[0].owner.avatar_url}
          // owner= {project[0].owner.login}
          homepage = { project[0].demo }
         />
      </div>
    )
  }

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
        <button onClick={ this.logout }>Logout</button>
        <button onClick={ () => this.switchDisplay("showcase") }>Projects</button>
        <button onClick={ () => this.switchDisplay("user") }>
          { this.state.user && this.state.user.name }
        </button>
      
      <p> You have entered: { this.state.term }</p>

      <SearchBar onInputChange={this.onInputChange}/>

      


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
