import React, { Component } from 'react';
import "./style/page_nav.css";

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
          className="nav-btn"
          onClick={ () => this.props.gotoPage(i) }
        >{ i + 1 }</li>
      )
    }
    return navList;
  }

  render() {
    return (
      <div className="nav-container">
        <button
          className="btn nav-btn prev-btn"
          onClick={ () => this.prevPage(this.props.current, this.props.gotoPage) }
        >
          <svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.414 5.586c-.78-.781-2.048-.781-2.828 0l-6.415 6.414 6.415 6.414c.39.391.902.586 1.414.586s1.024-.195 1.414-.586c.781-.781.781-2.047 0-2.828l-3.585-3.586 3.585-3.586c.781-.781.781-2.047 0-2.828z"/></svg>
        </button>
        <ul className="nav-list">
          { this.renderNavList(this.props.current) }
        </ul>
        <button
          className="btn nav-btn next-btn"
          onClick={ () => this.nextPage(this.props.current, this.props.gotoPage) }
        >
          <svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.586 5.586c-.781.781-.781 2.047 0 2.828l3.585 3.586-3.585 3.586c-.781.781-.781 2.047 0 2.828.39.391.902.586 1.414.586s1.024-.195 1.414-.586l6.415-6.414-6.415-6.414c-.78-.781-2.048-.781-2.828 0z"/></svg>
        </button>
      </div>
    )
  }
}
