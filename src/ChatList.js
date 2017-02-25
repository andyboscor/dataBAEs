import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

var chatlist_style = {
  width: '400px',
  fontWeight: 400,
  paddingTop: 0,
  overflowY: 'scroll',
  height: '100%',
  borderRight: '1.5px solid #8088B0'

};
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
var  items = [
     {id: 1, title: 'Item 1'},
     {id: 2, title: 'Item 2'},
     {id: 3, title: 'Item 3'},
     {id: 4, title: 'Item 3'},
     {id: 5, title: 'Item 3'},
     {id: 6, title: 'Item 3'},
     {id: 7, title: 'Item 3'},
     {id: 8, title: 'Item 3'},
     {id: 9, title: 'Item 3'},
     {id: 10, title: 'Item 3'},
     {id: 11, title: 'Item 3'},
     {id: 12, title: 'Item 3'},
     {id: 13, title: 'Item 3'}
   ];
class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {userid: '', users:[]};

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
  }
  handleClick(id) {
    this.setState({userid: id});
    this.props.handleResponse(this.state);

  }

  render() {
    return (
      <div style={chatlist_style}>
      <List>
      <Subheader>Friend chats</Subheader>
      {this.state.users.map(function(item){
            return <ListItem key={item.userID} primaryText={item.first_name + " " + item.last_name} onClick={this.handleClick.bind(this,item.id)} rightIcon={<CommunicationChatBubble />} leftAvatar={<Avatar src="https://organicthemes.com/demo/profile/files/2012/12/profile_img.png" />} />
          },this)}


      </List>
      </div>
    );
  }
}

export default ChatList;
