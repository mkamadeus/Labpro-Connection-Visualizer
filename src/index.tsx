import React from 'react';
import ReactDOM from 'react-dom';
import App from './layouts/App';
import CssBaseline from '@material-ui/core/CssBaseline';
ReactDOM.render(
  <>
    <style>
      @import
      url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
    </style>
    <CssBaseline />
    <App />
  </>,
  document.getElementById('root')
);
