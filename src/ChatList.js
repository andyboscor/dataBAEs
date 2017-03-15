import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
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
  borderRight: '1.5px solid #7e6bbc'

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
var chipstyle2 = {
  margin: '10px',
  marginLeft: '20px'
}
var colored = {
  backgroundColor: 'lightgray'
}

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open2:false,
      userid: '',
      users:[],
      open: false,
      dataSource: [],
      newUserID: '',
      newMessage: '',
      circleName: '',
      circleUsers: [],
      circleUsersToSend: [],
      newCircleID: '',
      circles: [],
      searchUser: '',
      circlecolor: false,
      circleMembers: []
    };

    this.handleClick = this.handleClick.bind(this);
  }
  getChatList() {
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/chats' , {
      headers: {
    'Authorization': 'Basic ' + localStorage.getItem('usercred')
  }
    })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        let users = [];
        for(let user of json) {
          users.push({
            picture: ("https://friendzone.azurewebsites.net/" + user.picture),
            userID: user.userID,
            first_name: user.first_name,
            last_name: user.last_name
          })
        }
        self.setState({
          users: users
        });
      }).catch(function(ex) {
        return;
      })
      fetch('https://friendzone.azurewebsites.net/API.php/circles' , {
        headers: {
      'Authorization': 'Basic ' + localStorage.getItem('usercred')
    }
      })
        .then(function(response) {
          return response.json()
        }).then(function(json) {
          //console.log('parsed json', json);
          self.setState({
            circles: json
          })

        }).catch(function(ex) {
          console.log('parsing failed', ex)
          return;
        })
  }
 componentDidMount(){
    this.getChatList();
  }
  getCircleMembers = (circle_id) =>{
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/circles/' + circle_id , {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }
    }).then(function(response) {
        return response.json()
    }).then(function(json) {
        var results = [];
        json.map(function(item,i){
          results.push({name:item.first_name + " " + item.last_name, uID: item.userID});
        });
        self.setState({
          circleMembers: results
        });
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }
  handleClick(id, to_circle) {
    this.setState({userid: id, colorid: id});
    this.props.handleResponse(id, to_circle);
    if(to_circle === true)
    {
      this.setState({circlecolor: true});
      this.getCircleMembers(id);
    }
    else this.setState({circlecolor: false});
  }
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false, newMessage:'',});
  };
  handleOpen2 = () => {
    this.setState({open2: true, newMessage: ''});
  };

  handleClose2 = () => {
    this.setState({open2: false, newMessage:'', circleUsers: [], circleUsersToSend: [], circleName: ''});
  };
  handleDeleteCircleMember = (circle_id, user_id) => {
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/circles/' + circle_id + '/' + user_id , {
      method: 'DELETE',
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }
    }).then(function(response) {
        return response.json()
    }).then(function(json) {
      //console.log(json);
      self.getCircleMembers(circle_id);

    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }
  deleteCircle = (circle_id) => {
    var self=this;
    fetch('https://friendzone.azurewebsites.net/API.php/circles/' + circle_id, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }
    }).then(function(response) {
        return response.json()
    }).then(function(json) {
      //console.log(json);
      self.getChatList();
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }
  addUser = () => {
    var users = this.state.circleUsers;
    var userIDs = this.state.circleUsersToSend;
    if(this.state.searchUser !== '')
    {
      users.push({name:this.state.newUserName, uID: this.state.newUserID});
      userIDs.push(this.state.newUserID);
      this.setState({circleUsers: users, newUserName: '', circleUsersToSend: userIDs});
    }
    this.setState({searchUser: ''});
  }
  handleUpdateInput = (value) => {
    this.setState({searchUser: value});
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/search/' + value , {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }
    }).then(function(response) {
        return response.json()
    }).then(function(json) {
      //console.log(json);
      var results = [];
      json.map(function(item,i){
        results.push({text: item.first_name + " " + item.last_name, value: (
        <MenuItem
          primaryText={item.first_name + " " + item.last_name}
          secondaryText="&#9786;"
          onTouchTap={() => self.setState({newUserID: item.userID, newUserName: item.first_name + " " + item.last_name })}
        />)});
        })

        self.setState({
          dataSource: results
        });
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  };

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
          //console.log('parsed json', json)
          self.handleClose();
          self.handleClick(self.state.newUserID, false);
          self.getChatList();
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        })
    }
    sendCircleMessage(){
      var self = this;
      console.log(this.state);
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
          //console.log('parsed json circle ', json)
          self.handleClose2();
          self.handleClick(self.state.newCircleID, true);
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
          //console.log('parsed json', json)
          self.setState({newCircleID: json.circle_id});
          //console.log(self.state.newCircleID);
          //self.handleClose2();
          self.sendCircleMessage();
          self.getChatList();
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
          style={buttonStyle}
          containerElement="label"
          backgroundColor='#7e6bbc'
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
              searchText={this.state.searchUser}
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
          style={buttonStyle}
          containerElement="label"
          backgroundColor='#7e6bbc'
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
              onChange={(event) => {this.setState({circleName: event.target.value});} }
              floatingLabelText="Circle name"
              fullWidth={true}
              />
            <AutoComplete
              hintText="Search for a user"
              dataSource={this.state.dataSource}
              onUpdateInput={this.handleUpdateInput}
              filter={AutoComplete.noFilter}
              searchText={this.state.newUserName}
              />
            <RaisedButton
              label="Add to circle"
              labelPosition="after"
              style={buttonStyle}
              containerElement="label"
              backgroundColor='#7e6bbc'
              labelStyle={labelStyle}
              onTouchTap={this.addUser}
              icon={<ContentAdd/>}
              />
            {this.state.circleUsers.map(function(item,i){
              return (
                <Chip key={item.uID + item.uID} style={chipstyle}>
                  <Avatar src="https://cdn3.iconfinder.com/data/icons/internet-and-web-4/78/internt_web_technology-13-512.png" />
                  {item.name}
                </Chip>
              )
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
          <Subheader>
            People chats
          </Subheader>
          {this.state.users.map(function(item){
            if(this.state.colorid === item.userID) return <ListItem
              key={item.userID}
              style={colored}
              primaryText={item.first_name + " " + item.last_name}
              onTouchTap={this.handleClick.bind(this,item.userID, false)}
              rightIcon={
                <CommunicationChatBubble />
              }
              leftAvatar={
                <Avatar src={item.picture} />
              } />
              else return <ListItem
                key={item.userID}
                primaryText={item.first_name + " " + item.last_name}
                onTouchTap={this.handleClick.bind(this,item.userID, false)}
                rightIcon={
                  <CommunicationChatBubble />
                }
                leftAvatar={
                  <Avatar src={item.picture} />
                } />
              },this)}

              <Subheader>
                Circle chats
              </Subheader>
              {this.state.circles.map(function(item,i){
                if(this.state.colorid === item.circleID && this.state.circlecolor === true)
                {
                  var arr = [];
                  var self = this;
                  arr.push(
                    <RaisedButton
                      key={i}
                      label="Delete circle"
                      labelPosition="after"
                      style={buttonStyle}
                      containerElement="label"
                      backgroundColor='#7e6bbc'
                      labelStyle={labelStyle}
                      onTouchTap={() => {self.deleteCircle(item.circleID)}}
                      />
                  );
                  this.state.circleMembers.map(function(item2,i){
                    arr.push(
                      <Chip
                        key={item2.uID}
                        style={chipstyle2}
                        onRequestDelete={() => self.handleDeleteCircleMember(item.circleID,item2.uID)}>
                        <Avatar src="https://cdn3.iconfinder.com/data/icons/internet-and-web-4/78/internt_web_technology-13-512.png" />
                        {item2.name}
                      </Chip>
                    )
                  });
                  return <ListItem
                    key={item.circleID}
                    style={colored}
                    primaryText={item.circleName}
                    nestedItems={arr}
                    onTouchTap={this.handleClick.bind(this,item.circleID, true)}
                    leftAvatar={
                      <Avatar src="http://kairosinsurancegroup.com/wp-content/uploads/2015/05/Group-Insurance-Icon.png" />
                    } />
                  }
                  else return <ListItem
                    key={item.circleID}
                    primaryText={item.circleName}
                    onTouchTap={this.handleClick.bind(this,item.circleID, true)}
                    rightIcon={
                      <CommunicationChatBubble />
                    }
                    leftAvatar={
                      <Avatar src="http://kairosinsurancegroup.com/wp-content/uploads/2015/05/Group-Insurance-Icon.png" />
                    } />
                  },this)}
          </List>
      </div>
    );
  }
}

export default ChatList;
