import React, {Component} from 'react';
import {Card, CardHeader} from 'material-ui/Card';

var title = {

      color: 'gray',
      fontWeight: 400,
      paddingTop: 0

  };
var message = {
    color:'black',
    fontWeight: 400,
    paddingTop:5
};
class ChatBubble extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardHeader titleStyle={title} subtitleStyle={message}
            title={this.props.sender_name}
            avatar="https://lumiere-a.akamaihd.net/v1/images/07ff8e314e2798d32bfc8c39f82a9601677de34c.jpeg"
            subtitle={this.props.message}
          />
        </Card>
      </div>
    );
  }
}

export default ChatBubble;
