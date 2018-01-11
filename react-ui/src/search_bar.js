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
                      className="text-field search-field"
                      type="text"
                      placeholder="Project query"
                      value={this.state.term}
                      onChange={this.onInputChange}
                    />
                </form>
            </div>
        )
    }
}

export default SearchBar;
