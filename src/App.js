import React, { Component } from 'react';
import './App.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dashboard from './Dashboard';
import {green100, green500, green700} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#7e6bbc",
    //primary2Color: "#202020",
    accent1Color: "#A4D336",
    textColor: "#000000"
  },
}, {
  avatar: {
    borderColor: null,
  },

});

class App extends Component {


	render() {
		return (
		<MuiThemeProvider muiTheme={muiTheme}>
			<Dashboard />
		</MuiThemeProvider>
		);
	}

}

export default App;
