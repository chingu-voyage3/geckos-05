import React, { Component } from 'react';

// filtering function template
function IsTerm(props) {
    if(props.length <20) {
        return <div><p>Sorry</p></div>
    }
    return <div><p>HELLO</p></div>
}

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {term: ''};
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(event){
        this.setState({ term: event.target.value });
    }

    onFormSubmit(event) {
        event.preventDefault();
        IsTerm(this.state.term);
        console.log("submitted " + this.state.term); 
    }

    render() {
        return (
            <div className="search-bar">
                <form onSubmit={this.onFormSubmit} id="filterForm" name="filterForm">
                    <input 
                        id="filterTextInput" 
                        name="filterTextInput" 
                        type="text" 
                        placeholder="Project query"
                        value={this.state.term}
                        onChange={this.onInputChange}
                        />
                    <select id="filterOptions" name="filterOptions">
                        <option>Voyage</option>
                        <option>Team</option>
                        <option>Stack</option>
                        <option>Category</option>
                    </select>
                    <span>
                        <button type="submit"> Submit </button>
                    </span>
                </form>
                <IsTerm />
            </div>
        )
    }
}

export default SearchBar;
