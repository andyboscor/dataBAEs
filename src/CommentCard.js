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
      userID: this.props.userID,
      isAdmin: this.props.isAdmin
    };
  }

  render() {
    let deleteButton;
    if (this.state.userID === localStorage.getItem('userID') || this.state.isAdmin === true) {
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
              avatar={this.props.picture}
              subtitle={this.props.message}>
              {deleteButton}
            </CardHeader>
        </Card>
      </div>
    );
  }
}

export default CommentCard;
