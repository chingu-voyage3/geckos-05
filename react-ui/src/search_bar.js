import React, { Component } from 'react';

class SearchBar extends Component {
  onInputChange = e => {
    this.props.onInputChange(e.target.value);
  }

  // drop down functions
  selectValueChange = e => {
    this.props.selectValueChange(e.target.value);
  }

  render() {
    const term = this.props.term;
    return (
      <div className="search-bar">
        <h3
          className={ this.props.term ? "fade-in filter-heading" : "fade-in filter-heading hidden" }
        >You are searching for: <span className="filter-term">{this.props.term}</span></h3>
        <form
          id="filterForm"
          name="filterForm"
          className="filter-form"
          onSubmit={ e => e.preventDefault() }
        >
          <input
            id="filterTextInput"
            name="filterTextInput"
            className="text-field search-field"
            type="text"
            placeholder="Search projects"
            value={term}
            onChange={this.onInputChange}
          />
          <select id="filterOptions"
                  name="filterOptions"
                  className="dropdown"
                  onChange={this.selectValueChange}>
            <option value="name">Project/Repo Name</option>
            <option value="description">Description</option>
          </select>
        </form>
      </div>
    )
  }
}

export default SearchBar;
