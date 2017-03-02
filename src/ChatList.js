import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
var chatlist_style = {
  width: '400px',
  fontWeight: 400,
  paddingTop: 0,
  overflowY: 'scroll',
  height: '100%',
  borderRight: '1.5px solid #8088B0'

};
var buttonStyle = {
  marginLeft: '20px',
  marginTop: '10px'
}
var labelStyle = {
  color: 'white'
};
var chipstyle = {
  margin: '10px'
}
/*<ListItem
primaryText={this.title}
key = {this.id}
onClick = {this.handleClick(this.id)}
leftAvatar={<Avatar src="https://organicthemes.com/demo/profile/files/2012/12/profile_img.png" />}
rightIcon={<CommunicationChatBubble />}
/>
<ListItem
primaryText="Eric Hoffman"
leftAvatar={<Avatar src="https://kenanfellows.org/wp-content/uploads/2016/02/blank-profile-picture-973460_960_720.png" />}
rightIcon={<CommunicationChatBubble />}
/>
<ListItem
primaryText="Grace Ng"
leftAvatar={<Avatar src="https://kenanfellows.org/wp-content/uploads/2016/02/blank-profile-picture-973460_960_720.png" />}
rightIcon={<CommunicationChatBubble />}
/>
<ListItem
primaryText="Kerem Suer"
leftAvatar={<Avatar src="https://kenanfellows.org/wp-content/uploads/2016/02/blank-profile-picture-973460_960_720.png" />}
rightIcon={<CommunicationChatBubble />}
/>
<ListItem
primaryText="Raquel Parrado"
leftAvatar={<Avatar src="https://kenanfellows.org/wp-content/uploads/2016/02/blank-profile-picture-973460_960_720.png" />}
rightIcon={<CommunicationChatBubble />}
/>
</List>
<Divider />
<List>
<Subheader>Circle Chats</Subheader>
<ListItem
primaryText="Circle 1"
leftAvatar={<Avatar src="https://kenanfellows.org/wp-content/uploads/2016/02/blank-profile-picture-973460_960_720.png" />}
/>
<ListItem
primaryText="Circle 2"
leftAvatar={<Avatar src="https://kenanfellows.org/wp-content/uploads/2016/02/blank-profile-picture-973460_960_720.png" />}
/>


    <ListItem
    primaryText={this.title}
    key = {this.id}
    onClick = {this.handleClick(this.state.id)}
    leftAvatar={<Avatar src="https://organicthemes.com/demo/profile/files/2012/12/profile_img.png" />}
    rightIcon={<CommunicationChatBubble />}
    />
*/

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {open2:false, userid: '', users:[], open: false, dataSource: [], newUserID: '', newMessage: '', circleName: '', circleUsers: [], circleUsersToSend: [], newCircleID: '', circles: []};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
 componentDidMount(){
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/chats' , {
      headers: {
    'Authorization': 'Basic ' + localStorage.getItem('usercred')
  }
    })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        //console.log('parsed json', json);
        self.setState({
          users: json.users
        })

      //console.log(self.state.users)
      }).catch(function(ex) {
        return;
        console.log('parsing failed', ex)
      })
      fetch('https://friendzone.azurewebsites.net/API.php/circles' , {
        headers: {
      'Authorization': 'Basic ' + localStorage.getItem('usercred')
    }
      })
        .then(function(response) {
          return response.json()
        }).then(function(json) {
          console.log('parsed json', json);
          self.setState({
            circles: json
          })

        //console.log(self.state.users)
        }).catch(function(ex) {
          return;
          console.log('parsing failed', ex)
        })
  }
  handleClick(id, to_circle) {
    this.setState({userid: id});
    this.props.handleResponse(id, to_circle);
  }
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  handleOpen2 = () => {
    this.setState({open2: true});
  };

  handleClose2 = () => {
    this.setState({open2: false});
  };
  addUser = () => {
    var users = this.state.circleUsers;
    var userIDs = this.state.circleUsersToSend;
    users.push({name:this.state.newUserName, uID: this.state.newUserID});
    userIDs.push(this.state.newUserID);
    this.setState({circleUsers: users, newUserName: '', circleUsersToSend: userIDs});
  }
  handleUpdateInput = (value) => {
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/search/' + value , {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }
    }).then(function(response) {
        return response.json()
    }).then(function(json) {
      console.log(json);
      var results = [];
      json.map(function(item,i){
        results.push({text: item.first_name + " " + item.last_name, value: (
        <MenuItem
          primaryText= {item.first_name + " " + item.last_name}
          secondaryText="&#9786;"
          onTouchTap ={() => self.setState({newUserID: item.userID, newUserName: item.first_name + " " + item.last_name })}
        />)});
        })

        self.setState({
          dataSource: results
        });
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })};
    handleSend(){
      var self = this;
      fetch('https://friendzone.azurewebsites.net/API.php/messages' , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + localStorage.getItem('usercred')
        },
        body: JSON.stringify({
         to_user: self.state.newUserID,
         message_content: self.state.newMessage,
        })
      })
        .then(function(response) {
          return response.json()
        }).then(function(json) {
          console.log('parsed json', json)
          self.handleClose();
          self.handleClick(self.state.newUserID, false);
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        })
    }
    sendCircleMessage(){
      var self = this;
      fetch('https://friendzone.azurewebsites.net/API.php/messages' , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + localStorage.getItem('usercred')
        },
        body: JSON.stringify({
         to_circle: self.state.newCircleID,
         message_content: self.state.newMessage,
        })
      })
        .then(function(response) {
          return response.json()
        }).then(function(json) {
          console.log('parsed json', json)
          self.handleClose();
          //self.handleClick(self.state.newUserID);
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        })
    }
    handleCircleSend(){
      var self = this;
      fetch('https://friendzone.azurewebsites.net/API.php/circles' , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + localStorage.getItem('usercred')
        },
        body: JSON.stringify({
         circleName: self.state.circleName,
         userIDs: self.state.circleUsersToSend,
        })
      })
        .then(function(response) {
          return response.json()
        }).then(function(json) {
          console.log('parsed json', json)
          self.setState({newCircleID: json});
          console.log(self.state.newCircleID);
          //self.handleClose();
          //self.handleClick(self.state.newUserID);
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        })
    }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Send"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSend.bind(this)}
      />,
    ];
    const actions2 = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose2.bind(this)}
      />,
      <FlatButton
        label="Send"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleCircleSend.bind(this)}
      />,
    ];
    return (
      <div style={chatlist_style}>
      <RaisedButton
     label="New user chat"
     labelPosition="after"
     style = {buttonStyle}
     containerElement="label"
     backgroundColor='#8088B0'
     labelStyle={labelStyle}
     onTouchTap={this.handleOpen}
       icon={<ContentAdd/>}
      >

      <Dialog
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
        autoScrollBodyContent={true}
      >
      <AutoComplete
          hintText="Search for a user"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
           filter={AutoComplete.noFilter}
        />
      <TextField
        hintText="Type anything"
        type="text"
        value={this.state.newMessage}
        onChange={ (event) => { this.setState({ newMessage: event.target.value });} }
        floatingLabelText="Message"
        fullWidth={true}
      />
      </Dialog>
      </RaisedButton>
      <RaisedButton
     label="New circle chat"
     labelPosition="after"
     style = {buttonStyle}
     containerElement="label"
     backgroundColor='#8088B0'
     labelStyle={labelStyle}
     onTouchTap={this.handleOpen2}
       icon={<ContentAdd/>}
      >

      <Dialog
        actions={actions2}
        modal={false}
        open={this.state.open2}
        onRequestClose={this.handleClose2}
        autoScrollBodyContent={true}
      >
      <TextField
        hintText="Type anything"
        type="text"
        value={this.state.circleName}
        onChange={ (event) => { this.setState({ circleName: event.target.value });} }
        floatingLabelText="Circle name"
        fullWidth={true}
      />
      <AutoComplete
          hintText="Search for a user"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
          filter={AutoComplete.noFilter}
          searchText = {this.state.newUserName}
      />
      <RaisedButton
     label="Add to circle"
     labelPosition="after"
     style = {buttonStyle}
     containerElement="label"
     backgroundColor='#8088B0'
     labelStyle={labelStyle}
     onTouchTap={this.addUser}
       icon={<ContentAdd/>}
      />
      {this.state.circleUsers.map(function(item,i){
        return (<Chip style={chipstyle}>
           <Avatar src="https://cdn3.iconfinder.com/data/icons/internet-and-web-4/78/internt_web_technology-13-512.png" />
           {item.name}
         </Chip>)
      })}

      <TextField
        hintText="Type anything"
        type="text"
        value={this.state.newMessage}
        onChange={ (event) => { this.setState({ newMessage: event.target.value });} }
        floatingLabelText="Message"
        fullWidth={true}
      />
      </Dialog>
      </RaisedButton>

      <List>
      <Subheader>People chats</Subheader>
      {this.state.users.map(function(item){
            return <ListItem key={item.userID} primaryText={item.first_name + " " + item.last_name} onTouchTap={this.handleClick.bind(this,item.userID, false)} rightIcon={<CommunicationChatBubble />} leftAvatar={<Avatar src="https://organicthemes.com/demo/profile/files/2012/12/profile_img.png" />} />
          },this)}

      <Subheader>Circle chats</Subheader>
      {this.state.circles.map(function(item){
            return <ListItem key={item.circleID} primaryText={item.circleName} onTouchTap={this.handleClick.bind(this,item.circleID, true)} rightIcon={<CommunicationChatBubble />} leftAvatar={<Avatar src="https://organicthemes.com/demo/profile/files/2012/12/profile_img.png" />} />
          },this)}
      </List>
      </div>
    );
  }
}

export default ChatList;
