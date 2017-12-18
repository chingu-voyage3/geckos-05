import React, { Component } from 'react';
import './App.css';
import Leaderboard from './leaderboard';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Leaderboard
          apiURL={ this.props.apiURL }
        />
      </div>
    );
  }
}
