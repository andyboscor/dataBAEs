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

const profileButton= {
  marginTop: '40px',
  backgroundColor:'#3F4652',
  height:'100%',
  marginLeft:'20px'
}

const profileDetails ={
  backgroundColor:'#3F4652',
  width:'50%',
  height:'100%',
  fontColor:'white !important',
  marginLeft:'10px'
}

const profileContainer = {
  backgroundColor:'#EBECED',
  width: '100%',
  height:'100%'
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

var friendRequest=[];
for (let i=0; i<10;i++) {
  friendRequest.push(
    <ListItem key={`friendRequest${i}`}
      primaryText="Dory Fish"
      leftAvatar={<Avatar src="https://pbs.twimg.com/profile_images/773917612648591365/hFl6DSSh.jpg" />}
      //rightIcon={friendsButton} TODO replace with dynamic
    />);
}

class Profile extends Component {
  state = {
    open: false,
    full_name: '',
    first_name: '',
    last_name: '',
    email_address: '',
    friendship_status: false,
    recommendArr:[],
    picture: localStorage.getItem('picture'),
    uploadProfilePicture: false
  };

  constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
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
        console.log("HELO", recFriends)
        var arr =[]
        for(let recommend of recFriends) {
          arr.unshift({
            recommendName: `${recommend.first_name} ${recommend.last_name}`,
            recommendAvatar:"https://friendzone.azurewebsites.net/" + recommend.picture
          });
        }
        self.setState({
          recommendArr: arr
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

  submitFriendshiptRequest() {
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/friends', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred'),
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
        //   friendID: self.state.friendID
        // })
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
  render() {
    let friendsButton;
    if (!this.state.friendship_status) {
      friendsButton = (
        <FloatingActionButton mini={true} onTouchTap={this.submitFriendshiptRequest.bind(this)}><ContentAdd /></FloatingActionButton>);
        // <FloatingActionButton style={closeButtonStyle} iconClassName={'Done'} onTouchTap={this.submitFriendshiptRequest.bind(this)} labelColor="white" backgroundColor="#8088B0"></FloatingActionButton>);
    } else {
      friendsButton = (
          <FloatingActionButton mini={true} backgroundColor="#FAFAFA" disabled={false} onTouchTap={this.submitFriendshiptRequest.bind(this)}><ContentAdd/></FloatingActionButton>
        );
    }

    var addFriendsList=[];
    for (let i=0; i<this.state.recommendArr.length;i++) {
      addFriendsList.push(
        <ListItem key={`addFriendTitle${i}`}
          primaryText={this.state.recommendArr[i].recommendName}
          leftAvatar={<Avatar src={this.state.recommendArr[i].recommendAvatar} />}
          rightIconButton={friendsButton}
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
              {friendRequest}
            </List>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
