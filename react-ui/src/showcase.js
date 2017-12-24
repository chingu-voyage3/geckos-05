import React, { Component } from 'react';
import ProjectCard from './project_card';
import ProjectPopUp from './project_pop_up';

export default class Showcase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
    }
  }

  // render functions
  renderProjectPage = page => {
  }

/*

*/
  render() {
    return (
      <div>
        { this.renderProjectPage(this.props.projectPage) }
      </div>
    )
  }
}
