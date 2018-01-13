import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {term: ""};

        this.onInputChange = this.onInputChange.bind(this);

    }
    
    // testing filter function
    isTerm = props => {
        if(props.length > 5) {
            console.log("it is true " + props.length);
            return true;
        } else {console.log("it is false " + props.length); 
        return false; }
    }

    onInputChange(event){
        this.props.onInputChange(event.target.value)
        this.setState({ term: event.target.value });
        console.log(this.state.term)
    }

    render() {
        const term = this.state.term;
        return (
            <div className="search-bar">
                <form onSubmit={this.onFormSubmit} id="filterForm" name="filterForm">
                    <input 
                        id="filterTextInput" 
                        name="filterTextInput" 
                        type="text" 
                        placeholder="Project query"
                        value={term}
                        onChange={this.onInputChange.bind(this)}
                        />

                    <select id="filterOptions" name="filterOptions">
                        <option value="name">Project/ Repo Name</option>
                        <option value="description">Description</option>
                    </select>
                </form>
                {/* {
                this.isTerm(term) ? <p><b>MORE</b> than 5 char</p>:
                                    <p>Less than 5 char</p> 
                } */}
        </div>
        )
    }
}

export default SearchBar;
