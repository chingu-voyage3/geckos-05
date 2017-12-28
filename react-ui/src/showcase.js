import React, { Component } from 'react';
import Page from './page';
import PageNav from './page_nav';

export default class Showcase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0
    }
  }

  selectPage = page => {
    this.setState({ currentPage: page });
  }

  render() {
    return (
      <div>
        <Page
          projects={ this.props.pages[this.state.currentPage] }
          toggleShowProject={ this.props.toggleShowProject }
        />
        <PageNav
          current={ this.state.currentPage }
          numPages={ this.props.pages.length }
          gotoPage={ this.selectPage }
        />
      </div>
    )
  }
}
