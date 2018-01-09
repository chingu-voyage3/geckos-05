import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {term: ''};

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(event){
        this.setState({ term: event.target.value })
    }

    onFormSubmit(event) {
        event.preventDefault();
        console.log("submitted " + this.state.term);
        this.setState({term: ''});
    }

    render() {
        return (
            <div className="search-bar">
                <form onSubmit={this.onFormSubmit} id="filterForm" name="filterForm">
                    <input
                        id="filterTextInput"
                        name="filterTextInput"
                        className="search-field"
                        type="text"
                        placeholder="Project query"
                        value={this.state.term}
                        onChange={this.onInputChange}
                        />
                    <select
                      className="dropdown"
                      id="filterOptions"
                      name="filterOptions"
                    >
                        <option>Voyage</option>
                        <option>Team</option>
                        <option>Stack</option>
                        <option>Category</option>
                    </select>
                    <span>
                        <button className="btn" type="submit"> Submit </button>
                    </span>
                </form>
            </div>
        )
    }
}

export default SearchBar;
