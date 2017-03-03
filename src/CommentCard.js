import React, {Component} from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import Clear from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';

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
class CommentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentID: this.props.commentID,
      userID: this.props.userID
    };
  }

  render() {
    let deleteButton;
    if (this.state.userID === localStorage.getItem('userID')) {
      deleteButton = (
        <IconButton
            style={{ float: 'right' }}
            tooltip="Delete Comment"
            tooltipPosition="top-center"
            onTouchTap={() => this.props.deleteFunction(this.state.commentID) }>
            <Clear />
        </IconButton>
      );
    }

    return (
      <div>
        <Card >
            <CardHeader titleStyle={title} subtitleStyle={message}
              title={this.props.firstname}
              avatar="https://lumiere-a.akamaihd.net/v1/images/07ff8e314e2798d32bfc8c39f82a9601677de34c.jpeg"
              subtitle={this.props.message}>
              {deleteButton}
            </CardHeader>
        </Card>
      </div>
    );
  }
}

export default CommentCard;
