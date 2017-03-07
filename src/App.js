import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dashboard from './Dashboard';

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
   <Dashboard />
 </MuiThemeProvider>
    );
  }
}

export default App;
