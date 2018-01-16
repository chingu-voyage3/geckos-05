import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: "",
            selectValue: "name"
    };
        this.onInputChange = this.onInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onInputChange(event){
        this.props.onInputChange(event.target.value);
        this.setState({ term: event.target.value });
        console.log(this.state.term);
    }

    // drop down functions
    handleChange(e) {
        this.props.handleChange(e.target.value);
        this.setState({selectValue:e.target.value});
    }

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
}

export default SearchBar;
