import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import OtherBlog from './OtherBlog.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Chat from './Chat.js';

const style = {margin: 5};
const profileInfo ={
  width:'400px',
  backgroundColor: '#80CBC4',
  height:'100%'
}
const profileContainer = {
  display: 'flex',
  height: '100%'
}
const contentContainer = {
  width: '100%',
  overflowY: 'scroll'
}
const closeButtonStyle = {
  marginLeft: '10px',
  marginRight: '20px',
  color: 'white',
  fontColor: 'white',
  marginTop: '20px'
}

class OtherProfile extends Component {
  state = {
    open: false,
    name: '',
    friendID: null,
    friendship_status: false,
    list:[]
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  componentDidMount(){
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/profile/' + self.props.friendID , {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }})
    .then(function(response) {
      return response.json()})
    .then(function(json) {
      console.log('parsed json', json)
      self.setState({name: json.first_name + " " + json.last_name})})
    .catch(function(ex) {
      console.log('parsing failed', ex)
    });

    fetch('https://friendzone.azurewebsites.net/API.php/friends/' + self.props.friendID , {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }})
    .then(function(response) {
      return response.json()})
    .then(function(json) {
      console.log('parsed json', json)
      self.setState({friends: json.friendship_status })})
    .catch(function(ex) {
      console.log('parsing failed', ex)
    });

    this.setState({
      friendID: self.props.friendID
    });
  }

  submitFriendshiptRequest() {
    var self = this;
    console.log(self.state.friendID);
    fetch('https://friendzone.azurewebsites.net/API.php/friends', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          friendID: self.state.friendID
        })
      })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        self.setState({
          friendship_status: true
        });
        console.log('parsed json', json)
      }).catch(function(ex) {
        console.log('parsing failed', ex);
        // FIXME: Add handling errors.
      });
  }

  render() {
    let friendsButton;
    if (!this.state.friendship_status) {
      friendsButton = (<RaisedButton style={closeButtonStyle} onTouchTap={this.submitFriendshiptRequest} label="Friends" labelColor="white" backgroundColor="#8088B0"></RaisedButton>);
    } else {
      friendsButton = (<RaisedButton style={closeButtonStyle} disabled={true} label="Friends" labelColor="white" backgroundColor="#8088B0"></RaisedButton>);
    }

    //console.log(this.props.friendID);
    return (
      <div style={profileContainer}>
      <div style={profileInfo}>
      <RaisedButton style={closeButtonStyle} onTouchTap={this.props.handleClose} label="Close" labelColor="white" backgroundColor="#8088B0"></RaisedButton>
          <center><h1> {this.state.name} </h1>
		  <Avatar
          src="http://www.heragtv.com/wp-content/uploads/2015/02/SM-AR-150-8.jpg"
          size={230}
          style={style}/>
            <RaisedButton style={closeButtonStyle} onTouchTap={this.handleClose} label="Blog" labelColor="white" backgroundColor="#8088B0"></RaisedButton>
            <RaisedButton style={closeButtonStyle} onTouchTap={this.handleClose} label="Photos" labelColor="white" backgroundColor="#8088B0"></RaisedButton>
            <RaisedButton style={closeButtonStyle} onTouchTap={this.handleClose} label="Message" labelColor="white" backgroundColor="#8088B0"></RaisedButton>
          </center>
          <center>
            {friendsButton}
          </center>
      </div>
      <div style={contentContainer}>
      <Chat {...this.state}/>
      <OtherBlog friendID={this.state.friendID}/>
      </div>
      </div>
    );
  }
}

export default OtherProfile;
