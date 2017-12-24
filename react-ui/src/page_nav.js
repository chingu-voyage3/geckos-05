import React, { Component } from 'react';

export default class PageNav extends Component {
  renderNavList = currentPage => {
    const navList = Array(this.props.numPages);
    return navList.map((page, i) => {
      return <li key={ Date.now() + i }>{ i + 1 }</li>
    })
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
