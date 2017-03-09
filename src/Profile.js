import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Done from 'material-ui/svg-icons/action/done';

const style = {
  margin: 5
};

const profileHeader ={
  display: 'flex',
  height:'30%',
  backgroundColor:'#3F4652',
  width:'100%'
}

const profilePic ={
  backgroundColor:'#3F4652',
  width:'250px',
  height:'100%',
  marginLeft: '80px'
}


const profileContainer = {
  backgroundColor:'#EBECED',
  width: '100%',
  height:'100%'
}

const profileButton= {
  marginTop: '40px',
  backgroundColor:'#3F4652',
  height:'30%',
  marginLeft:'20px'
}

const profileDetails ={
  backgroundColor:'#3F4652',
  width:'50%',
  height:'30%',
  fontColor:'white !important',
  marginLeft:'10px'
}



const bodyContainer = {
  display: 'flex',
  backgroundColor:'#EBECED',
  width:'100%',
  height: '100%',
  marginLeft: '50px'
}

const friendRecommendContainer ={
  width:'50%',
  height:'100%',
  marginLeft:'10px',
  marginRight:'10px',
}

const friendRequestContainer= {
  height:'100%',
  width:'50%',
  marginRight:'60px',
  marginLeft:'10px'
}

const goWhite = {
  color: 'white'
}

class Profile extends Component {
  state = {
    open: false,
    full_name: '',
    first_name: '',
    last_name: '',
    email_address: '',
    recommendArr:[],
    requestArr:[],
    picture: localStorage.getItem('picture'),
    uploadProfilePicture: false,
    newXMLprofile: false
  };

  constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.submitRecommend = this.submitRecommend.bind(this);
  }

  componentDidMount() {
    let value = localStorage.getItem('userID');
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/profile/' + value , {
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred')
        }
      })
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json);
        self.setState({
          full_name : json.first_name + " " + json.last_name,
          first_name: json.first_name,
          last_name: json.last_name,
          email_address: json.email_address
        });
      }).catch(function(ex) {
        // FIXME: Add handling errors.
        console.log('parsing failed', ex)
        return;
      });
    fetch('https://friendzone.azurewebsites.net/API.php/friend_recommendation', {
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred')
        }
      })
      .then(function(response) {
        return response.json();
      }).then(function(recFriends) {
        var arr =[]
        for(let recommend of recFriends) {
          arr.unshift({
            recommendID: recommend.userID,
            recommendName: `${recommend.first_name} ${recommend.last_name}`,
            recommendAvatar:"https://friendzone.azurewebsites.net/" + recommend.picture,
            friendship_status: false
          });
        }
        self.setState({
          recommendArr: arr
        });
      }).catch(function(ex) {
        console.log('parsing failed', ex)
        return;
      });
      fetch('https://friendzone.azurewebsites.net/API.php/friend_requests', {
          headers: {
            'Authorization': 'Basic ' + localStorage.getItem('usercred')
          }
        })
        .then(function(response) {
          return response.json();
        }).then(function(reqFriends) {
          console.log("HELssO", reqFriends)
          var arr =[]
          for(let requestFriend of reqFriends) {
            arr.unshift({
              requestID: requestFriend.userID,
              requestName: `${requestFriend.first_name} ${requestFriend.last_name}`,
              requestAvatar:"https://friendzone.azurewebsites.net/" + requestFriend.picture,
              requestStatus: false
            });
          }
          self.setState({
            requestArr: arr
          });
        }).catch(function(ex) {
          console.log('parsing failed', ex)
          return;
      });
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  handleNewXMLProfileClose = () => {
    this.setState({newXMLprofile: false});
  }
  handleNewXMLProfileOpen = () => {
    this.setState({newXMLprofile: true});
  }

  submitRecommend(friendIDInput, index) {
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/friends', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          friendID: friendIDInput
        })
      })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        self.state.recommendArr[index].friendship_status = true;
        self.setState({
          recommendArr: self.state.recommendArr
        });
      }).catch(function(ex) {
        console.log('parsing failed', ex);
        // FIXME: Add handling errors.
      });
  }

  submitRequest(friendIDInput, index) {
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/friends', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          friendID: friendIDInput
        })
      })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        self.state.requestArr[index].requestStatus = true;
        self.setState({
          requestArr: self.state.requestArr
        });
      }).catch(function(ex) {
        console.log('parsing failed', ex);
        // FIXME: Add handling errors.
      });
  }

  handleSubmit() {
    let value = localStorage.getItem('userID');
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/profile/' + value , {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: self.state.first_name,
          last_name: self.state.last_name,
          email_address: self.state.email_address,
        })
      })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        // FIXME: Display success alert.
        self.setState({
          full_name: self.state.first_name + " " + self.state.last_name
        });
        console.log('parsed json', json)
      }).catch(function(ex) {
        console.log('parsing failed', ex);
        // FIXME: Add handling errors.
      });
    this.handleClose();
  }

  upload_picture() {
    var input = document.querySelector('input[type="file"]')
    var data = new FormData()
    data.append('upfile', input.files[0])

    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/profile_pic/', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      },
      body: data
    }).then(function(response) {
        return response.json()
    }).then(function(json) {
        localStorage.setItem("picture", ("https://friendzone.azurewebsites.net/" + json.picture));
        self.setState({
          uploadProfilePicture:false,
          picture: ("https://friendzone.azurewebsites.net/" + json.picture)
        });
    });
  }
  downloadXML(){
    fetch('https://friendzone.azurewebsites.net/API.php/xml_profile' , {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }
    })
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        console.log(json);
        window.open("https://friendzone.azurewebsites.net/" + json.xml_path, '_blank');
    }).catch(function(ex) {
        // FIXME: Add handling errors.
        console.log('parsing failed', ex)
      return;
    });
  }
  upload_xml(){
    var input = document.querySelector('input[type="file"]')
    var data = new FormData()
    data.append('upfile', input.files[0])

    fetch('https://friendzone.azurewebsites.net/API.php/xml_profile', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      },
      body: data
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
        console.log(json);
        self.handleNewXMLProfileClose();
        self.setState({
          full_name: json[0].first_name + " " + json[0].last_name,
          first_name: json[0].first_name,
          last_name: json[0].last_name,
          email_address: json[0].email_address,
        })
        var credentials = json[0].email_address + ":" + localStorage.getItem("userpwd");
        localStorage.setItem("usercred",window.btoa(unescape(encodeURIComponent(credentials))));
    });
  }

  render() {
    var addFriendsList=[];
    for (let i=0; i<this.state.recommendArr.length;i++) {
      let friendsButton;
      if (!this.state.recommendArr[i].friendship_status) {
        friendsButton = (
          <FloatingActionButton mini={true} onTouchTap={() => this.submitRecommend(this.state.recommendArr[i].recommendID, i)}><ContentAdd/></FloatingActionButton>);
      } else {
        friendsButton = (
            <FloatingActionButton mini={true} disabled={true}><Done/></FloatingActionButton>
          );
      }
      addFriendsList.push(
        <ListItem key={`addFriendTitle${i}`}
          primaryText={this.state.recommendArr[i].recommendName}
          leftAvatar={<Avatar src={this.state.recommendArr[i].recommendAvatar} />}
          rightIconButton={friendsButton}
        />);
    }

    var reqFriendsList=[];
    for (let i=0; i<this.state.requestArr.length;i++) {
      let friendsReqButton;
      if (!this.state.requestArr[i].requestStatus) {
        friendsReqButton = (
          <FloatingActionButton mini={true} onTouchTap={() => this.submitRequest(this.state.requestArr[i].requestID, i)}><ContentAdd/></FloatingActionButton>);
      } else {
        friendsReqButton = (
            <FloatingActionButton mini={true} disabled={true}><Done/></FloatingActionButton>
          );
      }

      reqFriendsList.push(
        <ListItem key={`addFriendTitle${i}`}
          primaryText={this.state.requestArr[i].requestName}
          leftAvatar={<Avatar src={this.state.requestArr[i].requestAvatar} />}
          rightIconButton={friendsReqButton}
        />);
    }

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        type="submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />,
    ];

    const pictureActions = [
     <FlatButton
       label="Cancel"
       secondary={true}
       onTouchTap={() => { this.setState({ uploadProfilePicture: false })}}
     />,
     <FlatButton
       label="Upload"
       primary={true}
       keyboardFocused={true}
       onTouchTap={this.upload_picture.bind(this)}
     />,
   ];
   const actionsXML = [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={this.handleNewXMLProfileClose}
    />,
    <FlatButton
      label="Upload"
      primary={true}
      keyboardFocused={true}
      onTouchTap={this.upload_xml.bind(this)}
    />,
  ];
    return (
      <div style={profileContainer}>
        <div style={profileHeader}>
          <div style={profilePic}>
            <Avatar
              src={this.state.picture}
              size={230}
              style={style}/>
            <center>
              <RaisedButton onTouchTap={() => { this.setState({ uploadProfilePicture: true })}} label="Change Picture" labelColor="white" backgroundColor="#A4D336"/>
              <Dialog
               title="Upload a new profile picture."
               actions={pictureActions}
               modal={false}
               open={this.state.uploadProfilePicture}
               onRequestClose={() => { this.setState({ uploadProfilePicture: false })}}
             >
              <form>
              <input type="file" />
              </form>
              </Dialog>
            </center><br />
          </div>
          <div style={profileDetails}>
            <center>
              <h1 style={goWhite}> {this.state.full_name} </h1>
              <TextField type="text" value={this.state.first_name} hintText="First Name" inputStyle={goWhite} onChange={ (event) => { this.setState({ first_name: event.target.value });} } /><br />
              <TextField type="text" value={this.state.last_name} hintText="Last Name" inputStyle={goWhite} onChange={ (event) => { this.setState({ last_name: event.target.value });} } /><br />
              <TextField type="text" value={this.state.email_address} hintText="Email" inputStyle={goWhite} onChange={ (event) => { this.setState({ email_address: event.target.value });} } /><br /><br />
              <RaisedButton label="Save Changes" onTouchTap={this.handleOpen} labelColor="white" backgroundColor="#A4D336"/>
              <Dialog
                title="Dialog With Actions"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
              >
              </Dialog>
            </center>
          </div>
          <div style={profileButton}>
          <center>
            <RaisedButton label="Download Profile" onTouchTap={this.downloadXML}/><br /><br />
          </center>
          <center>
            <RaisedButton label="Upload Profile" onTouchTap={this.handleNewXMLProfileOpen}/><br /><br />
          </center>
          <Dialog
           title="Upload an XML profile"
           actions={actionsXML}
           modal={false}
           open={this.state.newXMLprofile}
           onRequestClose={this.handleNewXMLProfileClose}
         >
          <form>
          <input type="file" />
          </form>
          </Dialog>
          </div>
        </div>
        <div style={bodyContainer}>
          <div style={friendRecommendContainer}>
            <List>
              <Subheader>Recommended Friends</Subheader>
              {addFriendsList}
            </List>
          </div>
          <div style={friendRequestContainer}>
            <List>
              <Subheader>Friend Request</Subheader>
              {reqFriendsList}
            </List>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
