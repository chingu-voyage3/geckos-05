import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import ChinguProjectShowcase from './ChinguProjectShowcase';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <ChinguProjectShowcase
    apiURL={ "http://localhost:3001/api" }
  />, document.getElementById('root')
);
registerServiceWorker();
