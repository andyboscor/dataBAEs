import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

var chatlist_style = {
  width: '300px',
  maxWidth: '400px',
  fontWeight: 400,
  paddingTop: 0

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
     {id: 3, title: 'Item 3'}
   ];
class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {userid: '123'};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
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
      {items.map(function(item){
            return <ListItem key={item.id} primaryText={item.title} onClick={this.handleClick.bind(this,item.id)} rightIcon={<CommunicationChatBubble />} leftAvatar={<Avatar src="https://organicthemes.com/demo/profile/files/2012/12/profile_img.png" />} />
          },this)}


      </List>
      </div>
    );
  }
}

export default ChatList;
