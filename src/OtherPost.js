import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

var blogCards = {
  marginLeft: '20vw',
  marginRight: '20vw',
  marginTop: '5vh',

}

var headerStyle ={
    backgroundColor: '#80CBC4',
}
class OtherPost extends Component {


  render() {

    return (
    <div>
    <Card style={blogCards}>
    <CardHeader
      title={this.props.title}
      actAsExpander={true}
      titleColor="white"
      style={headerStyle}
    />
    <CardText>
      {this.props.message}
    </CardText>
    <CardActions>
    </CardActions>

  </Card>
      </div>
    );
  }
}

export default OtherPost;