import React, { Component } from 'react';

export default class PageNav extends Component {
  renderNavList = currentPage => {
    const navList = [];
    for (let i = 0; i < this.props.numPages; i++) {
      navList.push(
        <li
          key={ Date.now() + i }
          onClick={ () => this.props.gotoPage(i) }
        >{ i + 1 }</li>
      )
    }
    return navList;
  }

  render() {
    return (
      <div>
        <button>Prev</button>
        <ul>
          { this.renderNavList(this.props.current) }
        </ul>
        <button>Next</button>
      </div>
    )
  }
}
