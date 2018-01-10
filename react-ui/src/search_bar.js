import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {term: ""};

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);

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

    onFormSubmit(event) {
        event.preventDefault();
        console.log("submitted " + this.state.term);
        this.setState({term: ''});   
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
                        <option>Voyage</option>
                        <option>Team</option>
                        <option>Stack</option>
                        <option>Category</option>
                    </select>
                    <span>
                        <button type="submit"> Submit </button>
                    </span>
                </form>
                {
          this.isTerm(term) ? <p><b>MORE</b> than 5 char</p>:
          <p>Less than 5 char</p> 
        }
      
        </div>
        )
    }
}

export default SearchBar;
