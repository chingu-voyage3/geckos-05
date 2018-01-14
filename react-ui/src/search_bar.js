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

    // testing filter function
    isTerm = props => {
        if(props.length > 5) {
            console.log("it is true " + props.length);
            return true;
        } else {console.log("it is false " + props.length); 
        return false; }
    }

    onInputChange(event){
        this.props.onInputChange(event.target.value);
        this.setState({ term: event.target.value });
        console.log(this.state.term);
    }

    // drop down functions
    handleChange(e) {
        // this.props.handleChange(e.target.value)
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
                            onChange={this.handleChange}>
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
