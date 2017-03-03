import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Clear from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';

var blogCards = {
  marginLeft: '20vw',
  marginRight: '20vw',
  marginTop: '5vh',
}

var headerStyle ={
    backgroundColor: '#80CBC4',
}

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postID: this.props.postID,
    };
  }

  render() {
    let deleteButton;
    if (this.props.deleteFunction) {
      deleteButton = (
        <IconButton
            style={{ float: 'right', marginTop: '-15px' }}
            iconStyle={{ color: 'white' }}
            tooltip="Delete Post"
            tooltipPosition="top-center"
            onTouchTap={() => this.props.deleteFunction(this.state.postID) }>
            <Clear /> 
        </IconButton>
      );
    }

    return (
    <div>
      <Card style={blogCards}>
        <CardHeader
          title={this.props.postTitle}
          titleColor="white"
          style={headerStyle}
        >{deleteButton}</CardHeader>

        <CardText>
          {this.props.postContent}
        </CardText>

        <CardActions>
        </CardActions>
      </Card>
    </div>
    );
  }
}

export default Post;
