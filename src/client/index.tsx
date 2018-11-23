import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';

ReactDOM.hydrate(
  <Home />,
  document.getElementById('app')
);