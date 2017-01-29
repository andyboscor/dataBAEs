import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

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
            title={this.props.firstName}
            avatar="https://pbs.twimg.com/profile_images/1416214039/me.jpg"
            subtitle={this.props.message}
          />
        </Card>
      </div>
    );
  }
}

export default ChatBubble;
