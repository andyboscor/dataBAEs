import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import AutoComplete from 'material-ui/AutoComplete';
import {Tabs, Tab} from 'material-ui/Tabs';
import Autosuggest from 'react-autosuggest';
import Avatar from 'material-ui/Avatar';
import Blog from './Blog.js';
import Albums from './Albums.js';
import Profile from './Profile.js';
import Messaging from './Messaging.js';
import LoginPage from './LoginPage.js';
class Login extends Component {
static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} label="Login" />
    );
  }
}
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};
var tabColor = {
  backgroundColor: '#8088B0'
}
var underlineColor = {
  backgroundColor: '#80CBC4',
  height:'5px'
}
const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);



Logged.muiName = 'IconMenu';

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
 var container = {
   height:'100%',
   width:'100%',
   position:'fixed',
   overflowY:'hidden'
 };
 var scrollable = {
   overflowY: 'scroll',
   position:'relative',
   height: '100%',
   width: '100%'
 };
 var titleStyle={
  color: 'white',
  fontSize: '26px',
  lineHeight: '60px',
 }
var inLiners= {
   display: 'flex',
  width: '400px',
  marginTop:'-8px'
}
//This is where Dashboard starts
// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    name: 'Hello',
    year: 1972
  },
  {
    name: 'Helmo',
    year: 2012
  },
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input element
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

class Dashboard extends Component {
  state = {
    logged: true,
    dataSource: [],
    title: "FriendZone",
    open: true,
    loggedin: false,
    value: '',
    suggestions: []
  };
  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };
  handleOpen = () => {
   this.setState({open: true});
  };
  handleClose = () => {
   this.setState({open: false});
  };
  /*<Toggle
    label="Logged"
    defaultToggled={true}
    onToggle={this.handleChange}
    labelPosition="right"
    style={{margin: 20}}
  />*/
//iconElementLeft={<IconButton><NavigationMenu /></IconButton>}

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };


  handleLogin = () =>{
    this.setState({loggedin:true});
    //console.log("here");
  };
  handleLogout = () =>{
    this.setState({loggedin:false});
  };

  renderConditionala(){
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'Type a name',
      value,
      onChange: this.onChange
    };

    if(this.state.loggedin===false)
    {  return(
        <div style={container}>
        <LoginPage handleLogin={this.handleLogin} />
        </div>
      );
    }
    else return (
      <div>

      <AppBar
      title={<div> </div>}
      className="appBar"
      iconElementLeft={<div style={inLiners}>{this.state.title}<div><Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      /> </div></div>
      }

      iconStyleLeft={titleStyle}
        children={<div>   <IconMenu

            iconButtonElement={
            <Avatar
            src="https://lumiere-a.akamaihd.net/v1/images/07ff8e314e2798d32bfc8c39f82a9601677de34c.jpeg"
            size={50} />
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Profile" />
            <MenuItem primaryText="Sign out" onTouchTap={this.handleLogout} />
          </IconMenu></div>}
        iconElementRight={<div> </div>
      }
      />
      <div>
      <Tabs style={container} contentContainerStyle={scrollable} tabItemContainerStyle={tabColor} inkBarStyle={underlineColor} >
      <Tab label="Blog" value="a" onClick={this.handleClose} >
        <div>
          <Blog />
        </div>
      </Tab>
      <Tab label="Profile" value="b" onClick={this.handleClose}>
        <div>
        <Profile />
        </div>
      </Tab>
      <Tab label="Photo Albums" value="c" onClick={this.handleOpen}>
        <div>
        <Albums {...this.state}/>
        </div>
      </Tab>

      <Tab label="Messaging" value="d" onClick={this.handleClose}>
        <div>
          <Messaging />
        </div>
      </Tab>
  </Tabs>

      </div>
      </div>
    );
  }
    render() {
      return (
        <div style={container}>
          {this.renderConditionala()}

        </div>
      );
    }
}

export default Dashboard;
