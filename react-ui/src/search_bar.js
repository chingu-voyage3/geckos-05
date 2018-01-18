import React, { Component } from 'react';

class SearchBar extends Component {
  onInputChange = e => {
    this.props.onInputChange(e.target.value);
  }

  // drop down functions
  selectValueChange = e => {
    this.props.selectValueChange(e.target.value);
  }

<<<<<<< HEAD
    render() {
        const term = this.state.term;
        console.log(this.state.selectValue)
        return (
            <div className="search-bar">
                <form id="filterForm" name="filterForm">
                    <input
                      id="filterTextInput"
                      name="filterTextInput"
                      className="text-field search-field"
                      type="text"
                      placeholder="Project search"
                      value={term}
                      onChange={this.onInputChange.bind(this)}
                    />
                    <select id="filterOptions"
                            name="filterOptions"
                            className="dropdown"
                            onChange={this.handleChange}>
                        <option value="name">Project/ Repo Name</option>
                        <option value="description">Description</option>
                    </select>
                </form>
            </div>
        )
    }
=======
  render() {
      const term = this.props.term;
      return (
        <div className="search-bar">
          <form id="filterForm" name="filterForm" onSubmit={ e => e.preventDefault() }>
            <h3
              className={ this.props.term ? "filter-heading" : "hidden filter-heading" }
            >You are searching for: <span className="filter-term">{this.props.term}</span></h3>
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
                    onChange={this.selectValueChange}>
              <option value="name">Project/Repo Name</option>
              <option value="description">Description</option>
            </select>
          </form>
        </div>
      )
  }
>>>>>>> if no projects, print "no projects found"
}

export default SearchBar;
