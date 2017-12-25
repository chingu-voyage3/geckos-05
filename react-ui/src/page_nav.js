import React, { Component } from 'react';

export default class PageNav extends Component {
  // event handlers
  prevPage = (cur, handler) => {
    if (cur > 0) { return handler(cur - 1) }
    else return;
  }

  nextPage = (cur, handler) => {
    if (cur < this.props.numPages - 1) { return handler(cur + 1)}
    else return;
  }

  // special rendering methods
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
        <button onClick={ () => this.prevPage(this.props.current, this.props.gotoPage) }>
          Prev
        </button>
        <ul>
          { this.renderNavList(this.props.current) }
        </ul>
        <button onClick={ () => this.nextPage(this.props.current, this.props.gotoPage) }>
          Next
        </button>
      </div>
    )
  }
}
