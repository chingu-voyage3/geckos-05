import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App
    apiURL={ "http://localhost:3001/api" }
  />, document.getElementById('root')
);
registerServiceWorker();
