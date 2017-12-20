import React, { Component } from 'react';
import Leaderboard from './leaderboard';
import './style/app.css';

export default class App extends Component {
  render() {
    return (
      <div className="App chingu-palette">
        <Leaderboard/>
      </div>
    );
  }
}
