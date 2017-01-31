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
   height:'100%'
 };
class Dashboard extends Component {
  state = {
    logged: true,
    dataSource: [],
    title: "FriendZone"
  };
  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };
  /*<Toggle
    label="Logged"
    defaultToggled={true}
    onToggle={this.handleChange}
    labelPosition="right"
    style={{margin: 20}}
  />*/
//iconElementLeft={<IconButton><NavigationMenu /></IconButton>}
  render() {
    return (
      <div style={container}>

        <AppBar
        title={ <div>{this.state.title} <AutoComplete
         hintText="Type anything"
        dataSource={this.state.dataSource}/> </div>}

          iconElementLeft = {<div> </div>}

          //iconElementRight={this.state.logged ? <Logged /> : <Login />}
          iconElementRight={<Avatar
          src="https://pbs.twimg.com/profile_images/1416214039/me.jpg"
          size={50} />
        }
        />
        <div>
        <Tabs>
        <Tab label="Blog" value="a" >
          <div>
            <Blog />
          </div>
        </Tab>
        <Tab label="Profile" value="b">
          <div>
          <Profile />
          </div>
        </Tab>
        <Tab label="Photo Albums" value="c">
          <div>
          <Albums />
          </div>
        </Tab>

        <Tab label="Messaging" value="d">
          <div>
            <Messaging />
          </div>
        </Tab>
 </Tabs>

        </div>
      </div>
    );
  }
}

export default Dashboard;
