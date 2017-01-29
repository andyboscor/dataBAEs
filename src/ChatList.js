import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

var chatlist_style = {
  width: '300',
  maxWidth: '400',
  fontWeight: 400,
  paddingTop: 0

};

class ChatList extends Component {
  render() {
    return (
      <div style={chatlist_style}>
      <List>
      <Subheader>Friend chats</Subheader>
      <ListItem
      primaryText="Brendan Lim"
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
      </List>
      </div>
    );
  }
}

export default ChatList;
