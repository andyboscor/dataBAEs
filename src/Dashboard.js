import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AutoComplete from 'material-ui/AutoComplete';
import {Tabs, Tab} from 'material-ui/Tabs';
import Avatar from 'material-ui/Avatar';
import Blog from './Blog.js';
import Albums from './Albums.js';
import Profile from './Profile.js';
import Messaging from './Messaging.js';
import LoginPage from './LoginPage.js';
import OtherProfile from './OtherProfile.js';
import PrivacySettings from './PrivacySettings.js';
import AdminInterface from './AdminInterface.js';

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
var listStyle = {
  marginLeft: '15px'
}
var searchTextStyle = {
  color: 'white'
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
    profile: false,
    privacySettings: false,
    searchText: '',
    isAdmin: localStorage.getItem('isAdmin')==="true",
    showAdminMessages: false
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

  handleLogin = async () => {
    await fetch('https://friendzone.azurewebsites.net/API.php/profile/' + localStorage.getItem('userID') , {
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred')
        }
      })
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        localStorage.setItem("picture", ("https://friendzone.azurewebsites.net/" + json.picture));
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });
    this.setState({
      loggedin: true,
      isAdmin: localStorage.getItem('isAdmin')==="true"
    });
  };

  handleLogout = () =>{
    this.setState({loggedin:false});
    localStorage.setItem('userID','');
  };

  showProfile = (value) => {
    this.setState({profile:true, userID: value});
  };

  closeProfile = () => {
    this.setState({profile:false});
  };

  showPrivacy = () => {
    this.setState({privacySettings:true});
  };

  closePrivacy = () => {
    this.setState({privacySettings:false});
  };
  handleNewRequest = () => {
    this.setState({searchText: ''});
  }
  componentDidMount(){
    if(localStorage.getItem('userID') !== '')
      this.setState({loggedin: true});
  }

  handleUpdateInput = (value) => {
    this.setState({searchText: value});
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
        results.push({text: item.first_name + " " + item.last_name, value:(
          <MenuItem
            primaryText={item.first_name + " " + item.last_name}
            secondaryText="&#9786;"
            onTouchTap={() => {self.showProfile(item.userID); self.setState({searchText: ""})  } }
          />)
        });
      })
    self.setState({
      dataSource: results
    });
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  };

  renderProfile() {
    if(this.state.isAdmin===true) {
      if(this.state.showAdminMessages === true) {
        return (<Messaging isAdmin={true}/>);
      }
      return (<AdminInterface />);
    }
    if(this.state.privacySettings===true)
      return(
        <div style={container}><PrivacySettings handleClose={this.closePrivacy} /> </div>
      );
    if(this.state.profile===true)
    {
      return(
        <div style={container}><OtherProfile isAdmin={false} friendID={this.state.userID} handleClose={this.closeProfile} /> </div>
      );
    }
    else return (
      <div>
        <Tabs style={container} contentContainerStyle={scrollable} tabItemContainerStyle={tabColor} inkBarStyle={underlineColor} >
          <Tab label="Profile" value="a" onClick={this.handleClose}>
            <div>
            <Profile/>
            </div>
          </Tab>
          <Tab label="Blog" value="b" onClick={this.handleClose} >
            <div>
              <Blog userID={localStorage.getItem('userID')}/>
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

  renderConditional(){
    let searchBar, menu;
    if (this.state.isAdmin!==true){
      searchBar = (<AutoComplete
            style={listStyle}
            inputStyle={searchTextStyle}
            hintText="Search for a user"
            dataSource={this.state.dataSource}
            onUpdateInput={this.handleUpdateInput}
            filter={AutoComplete.noFilter}
            onNewRequest={this.handleNewRequest}
            searchText={this.state.searchText}
        />);
      menu = (<MenuItem primaryText="Privacy Settings" onTouchTap={this.showPrivacy}/>);
    } else {
      if (this.state.showAdminMessages === false) {
        menu=(<MenuItem primaryText="Messages" onTouchTap={() => this.setState({ showAdminMessages: true })}/>);
      }else{
        menu= (<MenuItem primaryText="User List" onTouchTap={() => this.setState({ showAdminMessages: false })}/>);
      }
    }
    if(this.state.loggedin===false){
      return(
        <div style={container}>
        <LoginPage handleLogin={this.handleLogin} />
        </div>
      );
    }else return (
      <div style={{ height: '100%', overflowY: 'scroll' }}>
        <AppBar
          title={<div> </div>}
          className="appBar"
          iconElementLeft={
            <div style={inLiners}>{this.state.title}
              <div>
              {searchBar}
              </div>
            </div>
          }
          iconStyleLeft={titleStyle}
          children={
            <div>
            <IconMenu
              iconButtonElement={
                <IconButton style={iconSize}>
                  <Avatar
                  src={localStorage.getItem('picture')}
                  size={50}
                  />
                </IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
            {menu}
            <MenuItem primaryText="Sign out" onTouchTap={this.handleLogout} />
            </IconMenu></div>
          }
          iconElementRight={<div> </div>}
        />
        {this.renderProfile()}
      </div>);
  }

  render() {
    return (
      <div style={container}>{this.renderConditional()}</div>
    );
  }

}

export default Dashboard;
