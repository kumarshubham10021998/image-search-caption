// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Main App component
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './redux/store'; // Import the configured store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
