import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import Blog from './Blog.js';
import Chat from './Chat.js';
import Done from 'material-ui/svg-icons/action/done';
import Albums from './Albums.js';

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
  height: window.innerHeight - 64,
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
    open: true,
    name: '',
    friendID: this.props.friendID,
    friendship_status: false,
    list:[],
    chat_id: '',
    to_circle: false,
    blog: true,
    photos: false,
    chat: false,
    picture: '',
    isAdmin: this.props.isAdmin
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  componentWillMount(){
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/profile/' + self.props.friendID , {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }})
    .then(function(response) {
      return response.json()})
    .then(function(json) {
      self.setState({
        name: (json.first_name + " " + json.last_name),
        picture: ("https://friendzone.azurewebsites.net/" + json.picture)
      })})
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
      self.setState({
        friendship_status: (json.friendship_status === "true"),
        friendID: self.props.friendID
      })})
    .catch(function(ex) {
      console.log('parsing failed', ex)
    });
  }

  submitFriendshiptRequest() {
    var self = this;
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
      }).catch(function(ex) {
        console.log('parsing failed', ex);
        // FIXME: Add handling errors.
      });
  }
  getMessages() {
  this.setState({chat_id: this.props.friendID});
  var self = this;
  fetch('https://friendzone.azurewebsites.net/API.php/messages/to_user/' + self.state.friendID , {
    headers: {
  'Authorization': 'Basic ' + localStorage.getItem('usercred')
    }
  })
    .then(function(response) {
      return response.json()
    }).then(function(json) {

      var results = [];
      json.map(function(item,i)
      {
        results.push({message:item.message_content, sender_name:item.sender_name});
    });
    self.setState({
      list:results,
      exista: true
    });
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }
  handleSend = (data, to_circle) => {
    var send_to = '';
    if(to_circle === true)
    send_to = "to_circle";
    else send_to = "to_user";
    var payload = {};
    payload[send_to] = this.state.chat_id;
    payload["message_content"] = data;
    console.log(payload);
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/messages' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      },
      body: JSON.stringify(payload)
    })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        console.log('parsed json', json)

        self.getMessages(self.state.chat_id);

      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }
  openChat = () => {
    this.getMessages();
    this.setState({blog:false, photos:false, chat: true});
  }
  openBlog = () => {
    this.setState({blog:true, photos: false, chat: false});
  }
  openPhotos = () => {
    this.setState({blog:false, chat: false, photos: true});
  }
  render() {
    let friendsButton;
    if (!this.state.friendship_status) {
      friendsButton = (<RaisedButton style={closeButtonStyle} onTouchTap={this.submitFriendshiptRequest.bind(this)} label="Add Friend" labelColor="white" backgroundColor="#8088B0"></RaisedButton>);
    } else {
      friendsButton = (<RaisedButton style={closeButtonStyle} disabled={true} icon={<Done />} label="Friends" labelColor="white" backgroundColor="#8088B0"></RaisedButton>);
    }
    let profileTab;
    if(this.state.blog === false && this.state.photos === false && this.state.chat === true) {
      profileTab = (<Chat {...this.state}  handleSend={this.handleSend}/>)
    }
    if(this.state.chat === false && this.state.photos === false && this.state.blog === true) {
      profileTab = (<Blog isAdmin={this.state.isAdmin} userID={this.props.friendID}/>)
    }
    if(this.state.blog === false && this.state.chat === false && this.state.photos === true) {
      profileTab = (<Albums {...this.state}/>)
    }
    //console.log(this.props.friendID);
    return (
      <div style={profileContainer}>
      <div style={profileInfo}>
      <RaisedButton style={closeButtonStyle} onTouchTap={this.props.handleClose} label="Close" labelColor="white" backgroundColor="#8088B0"></RaisedButton>
          <center><h1> {this.state.name} </h1>
		  <Avatar
          src={this.state.picture}
          size={230}
          style={style}/>
            <RaisedButton style={closeButtonStyle} onTouchTap={this.openBlog} label="Blog" labelColor="white" backgroundColor="#8088B0"></RaisedButton>
            <RaisedButton style={closeButtonStyle} onTouchTap={this.openPhotos} label="Photos" labelColor="white" backgroundColor="#8088B0"></RaisedButton>
            <RaisedButton style={closeButtonStyle} onTouchTap={this.openChat} label="Message" labelColor="white" backgroundColor="#8088B0"></RaisedButton>
          </center>
          <center>
            {friendsButton}
          </center>
      </div>
      <div style={contentContainer}>
      {profileTab}
      </div>
      </div>
    );
  }
}

export default OtherProfile;
