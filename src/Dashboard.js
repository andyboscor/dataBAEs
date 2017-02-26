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
import Avatar from 'material-ui/Avatar';
import Blog from './Blog.js';
import Albums from './Albums.js';
import Profile from './Profile.js';
import Messaging from './Messaging.js';
import LoginPage from './LoginPage.js';
import OtherProfile from './OtherProfile.js';

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

var iconSize = {
  width: '65px',
  height: '65px'
}

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

class Dashboard extends Component {
  state = {
    logged: true,
    dataSource: [],
    title: "FriendZone",
    open: true,
    loggedin: false,
    value: '',
    dataSource: [],
    profile: false,
    userSearch: ''
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

  handleLogin = () =>{
    this.setState({loggedin:true});
  };

  handleLogout = () =>{
    this.setState({loggedin:false});
  };

  showProfile = (value) => {
    this.setState({profile:true, userID: value});
  };

  closeProfile = () => {
    this.setState({profile:false});
  };

  handleUpdateInput = (value) => {
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/search/' + value , {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }
    }).then(function(response) {
        return response.json()
    }).then(function(json) {
      var results = [];
      json.map(function(item,i){
        results.push({text: item.first_name + " " + item.last_name, value: (
        <MenuItem
          primaryText= {item.first_name + " " + item.last_name}
          secondaryText="&#9786;"
          onTouchTap ={() => self.showProfile(item.userID)}
        />)});
        })

        self.setState({
          dataSource: results
        });
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })};

  renderProfile(){
    if(this.state.profile===true)
      return(
        <div style={container}><OtherProfile friendID={this.state.userID} handleClose={this.closeProfile} /> </div>
      );
    else return (
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
    );
  }

  renderConditionala(){


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
      iconElementLeft={<div style={inLiners}>{this.state.title}<div>  <AutoComplete
          hintText="Type anything"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
           filter={AutoComplete.noFilter}
        /></div></div>
      }

      iconStyleLeft={titleStyle}
        children={<div>   <IconMenu

            iconButtonElement={
              <IconButton style={iconSize}>
            <Avatar
            src="https://lumiere-a.akamaihd.net/v1/images/07ff8e314e2798d32bfc8c39f82a9601677de34c.jpeg"
            size={50}
            />
            </IconButton>
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
      {this.renderProfile()}
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
