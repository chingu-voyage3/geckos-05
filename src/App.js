import React, { Component } from 'react';
import './App.css';
import Leaderboard from './leaderboard';

// 1. the "feed box"
// 2. an idea card

class App extends Component {
  render() {
    return (
      <div className="App">
        <Leaderboard />
      </div>
    );
  }
}

export default App;
