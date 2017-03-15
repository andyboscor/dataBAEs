import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import Blog from './Blog.js';
import Chat from './Chat.js';
import Done from 'material-ui/svg-icons/action/done';
import Albums from './Albums.js';
import {List, ListItem} from 'material-ui/List';
import AutoComplete from 'material-ui/AutoComplete';


const style = {margin: 5};
const profileInfo ={
  width:'400px',
  backgroundColor: '#393F4B',
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

var goWhite = {
  color: '#CECECE'
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
    friends: false,
    friendList: [],
    picture: '',
    isAdmin: this.props.isAdmin,
    privacyError: false
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  getProfileInfo = (friendID) => {
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/profile/' + friendID , {
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

    fetch('https://friendzone.azurewebsites.net/API.php/friendship_status/' + friendID , {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }})
    .then(function(response) {
      return response.json()})
    .then(function(json) {
      //console.log('friendID', self.props.friendID);
      //console.log('friendship_status', json);
      self.setState({
        friendship_status: (json.friendship_status === "true"),
        friendID: friendID
      })})
    .catch(function(ex) {
      console.log('parsing failed', ex)
    });
  }
  componentDidMount(){
    this.setState({friendID: this.props.friendID});
    this.getProfileInfo(this.props.friendID);
  }
  componentWillReceiveProps(){
    if(this.state.friendID!==this.props.friendID)
    {
      this.setState({friendID: this.props.friendID, blog:true});
      this.getProfileInfo(this.props.friendID);
    }
    //console.log(this.props.friendID);
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
        results.push({
          message: item.message_content,
          sender_name: item.sender_name,
          picture: ("https://friendzone.azurewebsites.net/" + item.picture)
        });
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
    this.setState({blog:false, photos:false, chat: true, friends: false, privacyError: false});
  }
  openBlog = () => {
    this.setState({blog:true, photos: false, chat: false, friends: false, privacyError: false});
  }
  openPhotos = () => {
    this.setState({blog:false, chat: false, photos: true, friends: false, privacyError: false});
  }
  openFriendsList = () => {
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/friends/' + self.state.friendID , {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }
    })
      .then(function(response) {
        if(response.status===403)
          self.setState({
            privacyError: true
          });
        return response.json()})
        .then(function(reqFriends) {
        var arr =[]
        for(let friend of reqFriends) {
          arr.unshift({
            friendID: friend.userID,
            friendName: `${friend.first_name} ${friend.last_name}`,
            friendAvatar:"https://friendzone.azurewebsites.net/" + friend.picture
          });
        }

        self.setState({
          blog:false,
          chat: false,
          photos: false,
          friends: true,
          friendList: arr,
        });
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  };
  handleUpdateInput = (value) => {
    this.setState({searchText: value});
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/friends/' + self.state.friendID +'/' + value , {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }
    }).then(function(response) {
        return response.json()
    }).then(function(json) {
      var arr =[]
      for(let friend of json) {
        arr.unshift({
          friendID: friend.userID,
          friendName: `${friend.first_name} ${friend.last_name}`,
          friendAvatar:"https://friendzone.azurewebsites.net/" + friend.picture
        });
      }
    self.setState({
      friendList: arr
    });
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  };
  render() {
    let friendsButton;
    if (!this.state.friendship_status && this.state.isAdmin !== true) {
      friendsButton = (<RaisedButton style={closeButtonStyle} onTouchTap={this.submitFriendshiptRequest.bind(this)} label="Add Friend" labelColor="white" backgroundColor="#7e6bbc"></RaisedButton>);
    } else if (this.state.isAdmin !== true) {
      friendsButton = (<RaisedButton style={closeButtonStyle} disabled={true} icon={<Done />} label="Friends" labelColor="white" backgroundColor="#7e6bbc"></RaisedButton>);
    }
    let profileTab;
    if(this.state.blog === false && this.state.photos === false && this.state.chat === true) {
      profileTab = (<Chat {...this.state}  handleSend={this.handleSend}/>)
    }
    if(this.state.chat === false && this.state.photos === false && this.state.blog === true) {
      profileTab = (<Blog isAdmin={this.state.isAdmin} userID={this.state.friendID}/>)
    }
    if(this.state.blog === false && this.state.chat === false && this.state.photos === true) {
      profileTab = (<Albums {...this.state}/>)
    }
    if(this.state.friends === true) {
      let myFriends = [];
      for (let friend of this.state.friendList) {
        var self = this;
        myFriends.push(
          <ListItem key={`friend${friend.friendID}`}
            primaryText={friend.friendName}
            leftAvatar={<Avatar src={friend.friendAvatar} />}
            onTouchTap={() => {self.setState({friendID:friend.friendID, friends:false, blog:true}); self.getProfileInfo(friend.friendID);}}
          />);
      }
      profileTab = (<div style={{ textAlign: 'center' }}>
        <h2>{this.state.name + "'s Friends List"}</h2>
          <AutoComplete
                hintText="Search for a friend"
                dataSource={this.state.friendList}
                onUpdateInput={this.handleUpdateInput}
                filter={AutoComplete.noFilter}
                searchText={this.state.searchText}
            />
        {myFriends}
      </div>);
    }
    if(this.state.privacyError===true){
      profileTab=(
        <div style={{marginTop: '100px'}}><center>
        <h1>Seems like you don't have the rights to view this user's Friends List</h1>
        <Avatar
            src="http://www.iconninja.com/files/415/882/376/confused-icon.svg"
            size={230}
            style={style}/>
        </center>
        </div>
      );
    }
    //console.log(this.props.friendID);
    return (
      <div style={profileContainer}>
      <div style={profileInfo}>
      <RaisedButton style={closeButtonStyle} onTouchTap={this.props.handleClose} label="Close" labelColor="white" backgroundColor="#7e6bbc"></RaisedButton>
          <center><h1 style={goWhite}> {this.state.name} </h1>
		  <Avatar
          src={this.state.picture}
          size={230}
          style={style}/>
            <RaisedButton style={closeButtonStyle} onTouchTap={this.openBlog} label="Blog" labelColor="white" backgroundColor="#7e6bbc"></RaisedButton>
            <RaisedButton style={closeButtonStyle} onTouchTap={this.openPhotos} label="Photos" labelColor="white" backgroundColor="#7e6bbc"></RaisedButton>
            <RaisedButton style={closeButtonStyle} onTouchTap={this.openChat} label="Message" labelColor="white" backgroundColor="#7e6bbc"></RaisedButton>
            <RaisedButton style={closeButtonStyle} onTouchTap={this.openFriendsList} label="Friends" labelColor="white" backgroundColor="#7e6bbc"></RaisedButton>
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
