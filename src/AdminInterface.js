import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Done from 'material-ui/svg-icons/action/done';
import Create from 'material-ui/svg-icons/content/create';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import OtherProfile from './OtherProfile.js';


const style = {
  margin: 5
};

const profileHeader ={
  height:'30%',
  backgroundColor:'#3F4652',
  width:'100%',
  fontColor:'white !important'
}

const profileContainer = {
  width: '100%',
  height:'30%'
}

const goWhite = {
  color: 'white'
}


const listItem = {
  marginLeft:'50px',
  marginRight:'50px'
}

const container = {
 height:'100%',
 width:'100%',
 position:'fixed',
 overflowY:'hidden'
};

class AdminInterface extends Component {
  state = {
    users: [],
    currentUser: null
  }

  constructor(props){
    super(props);
  }

  componentDidMount() {
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/users' , {
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred')
        }
      })
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json);
        self.setState({
          users : json
        });
      }).catch(function(ex) {
        // FIXME: Add handling errors.
        console.log('parsing failed', ex)
        return;
      });
  }

  closeProfile() {
    this.setState({
      currentUser: null
    });
  }

  render() {
    if(this.state.currentUser !== null) {
      return (<div style={container}><OtherProfile isAdmin={true} friendID={this.state.currentUser} handleClose={this.closeProfile.bind(this)} /></div>);
    }

    return (
      <div style={profileContainer}>
        <div style={profileHeader}>
          <center>
            <h1 style={{ color: 'white', margin: '0', paddingTop: '10px' }}>Admin Interface</h1>
          </center>
        </div>
        <div>
          <List>
            <Subheader style={listItem}>Users</Subheader>
            {
              this.state.users.map((u) => {
                let editButton = (
                    <FloatingActionButton style={{ marginTop: '3px' }} onTouchTap={() => this.setState({ currentUser: u.userID })} mini={true}>
                      <Create />
                    </FloatingActionButton>);
                return (<ListItem key={u.userID}
                  style={listItem}
                  primaryText={u.first_name + " " + u.last_name}
                  leftAvatar={<Avatar src={("https://friendzone.azurewebsites.net/" + u.picture)} />}
                  rightIconButton={editButton}
                />);
              })
            }
          </List>
        </div>
      </div>
    );
  }
}

export default AdminInterface;
