import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

var blogCards = {
  marginLeft: '20vw',
  marginRight: '20vw',
  marginTop: '5vh',

}

var headerStyle ={
    backgroundColor: '#3b5999',
}
class Post extends Component {


  render() {

    return (
    <div>
    <Card style={blogCards}>
    <CardHeader
      title={this.props.username}
      actAsExpander={true}
      titleColor="white"
      style={headerStyle}
    />
    <CardText>
      {this.props.email_address}
    </CardText>
    <CardActions>
    </CardActions>

  </Card>
      </div>
    );
  }
}

export default Post;
