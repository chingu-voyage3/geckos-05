import React, { Component } from 'react';
import OnClickOverlay from './on_click_overlay.js';
import Showcase from './showcase';
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
      term: "",
      selectValue: "name"
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
    console.log(projectId || "undefined");
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

  // will filter out projects that match value by name
  filteredProjects = projects => {
    return projects.filter(project => project.name.toLowerCase().indexOf(this.state.term.toLowerCase()) > -1);
  }

  // old filter suggestions: voyage, team, stack, category
  // will filter projects based on description * use with caution *
  filteredDescription = projects => {
    const re = RegExp( this.state.term, 'i');
    return projects.filter(
      project => re.test(project.description)
    );
  }

  onInputChange = term => {
    this.setState({
      term: term
    })
  };

  handleChange = selectValue => {
    this.setState({selectValue: selectValue});
}

  renderProjectPage = projectId => {
    const project = this.state.projects.filter(project => {
      return project._id === projectId
    });

    console.log(project);

    return (
      <ProjectPopUp
        picture="https://fthmb.tqn.com/O4_y2C8U4MO-f2uaeI-aHVf8eek=/768x0/filters:no_upscale()/about-blank-58824fe55f9b58bdb3b27e21.png" //placeholder image
        name={ project[0].name }
        description={ project[0].description}
        url={ project[0].repo}
        contributors={project[0].contributors}
        // memberImg={project[0].owner.avatar_url}
        // owner= {project[0].owner.login}
        homepage = { project[0].demo }
        toggleShowProject={ () => this.toggleShowProject(project._id) }
/>
    )
  }

  // note: "temporary" fix for TypeError: projects undefined when
  // user searches for a term with no results.
  whichDisplay = display => {
    if(this.state.hasError) {
      return (
        <div>
          <h2>Sorry there are no matching results! Refresh to try again!</h2>
        </div>

      )
    } else{
    return (
        <Showcase
          pages={ this.pageProjects(this.state.selectValue === "name" ?
          this.filteredProjects(this.state.projects): this.filteredDescription(this.state.projects))}
          toggleShowProject={ this.toggleShowProject }
        />
    )
    }
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

    // error handling
    componentDidCatch() {
      this.setState( { hasError: true})
    }


  render() {
    return (
      <div className="App">
        <div className="backdrop"></div>
        <div className="main-container">
          <div className="masthead-container">
            <h1 className="masthead">Chingu Project Showcase</h1>
            <h3 className="masthead"> You are searching for: <strong>{this.state.term}</strong> </h3>
          </div>
          <SearchBar
            onInputChange={this.onInputChange}
            handleChange={this.handleChange}
          />
          { this.state.fetching ?
            <p>Fetching project data...</p> :
            this.state.openProject ?
              this.renderProjectPage(this.state.openProject) :
              this.whichDisplay(this.state.show)
          }
          { this.state.openProject && <OnClickOverlay handleOnClick={ this.toggleShowProject } /> }
          { this.state.openProject && this.renderProjectPage(this.state.openProject) }
        </div>
      </div>
    );
  }
}
