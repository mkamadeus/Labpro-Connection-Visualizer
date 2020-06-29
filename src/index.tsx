import React from 'react';
import ReactDOM from 'react-dom';
import App from './layouts/App';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeContextProvider } from './context/ThemeContext';
ReactDOM.render(
  <ThemeContextProvider>
    <style>
      @import
      url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
    </style>
    <CssBaseline />
    <App />
  </ThemeContextProvider>,
  document.getElementById('root')
);
