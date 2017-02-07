import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Post from './Post.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import 'whatwg-fetch';

var addBottom = {
  marginBottom: '50px'
}

var cardarray1 = [ {username:"This is my long ass post", email_address: "I don't think I'm into this whole Computer Science thing anymore. Writing code. What the hell was I thinking when I signed up for this. Like duuuh. But like it's cool tho. Look at me go I've already wasted so much time writing this when I could've handled the states."}, {username:"This is my long ass post", email_address: "I don't think I'm into this whole Computer Science thing anymore. Writing code. What the hell was I thi"}, {username:"This is my long ass post", email_address:"  I don't think I'm into this whole Computer Science thing anymore. Writing code. What the hell was I thinking when I signed up for this. Like duuuh. But like it's cool tho. Look at me go I've already wasted so much time writing this when I could've handled the states."}, {username:'This is my long ass post', email_address:"  I don't think I'm into this whole Computer Science thing anymore. Writing code. What the hell was I thinking when I signed up for this. Like duuuh. But like it's cool tho. Look at me go I've already wasted so much time writing this when I couldve handled the states and some other shit."}];


var buttonFloat ={
  marginRight: 20,
  display: 'flex', 
  justifyContent: 'center'
};


class Blog extends Component {

  state = {
    cardarray: []
  }

  componentDidMount() {
    var self = this;
    fetch('http://friendzone.azurewebsites.net/API.php/friends/1', {
      headers: {
    'Authorization': 'Basic ' + window.btoa(unescape(encodeURIComponent("email_address1@google.com:secret")))
  }
    })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        console.log('parsed json', json)

        //cardarray = json.results;
    self.setState({cardarray: json})
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
    self.setState({cardarray: cardarray1})
    }

  stateButton = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };


  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
    <div style={addBottom}>
      <div style={buttonFloat}>
        <FloatingActionButton onTouchTap={this.handleOpen}>
          <ContentAdd/>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
          >
          </Dialog>
        </FloatingActionButton>
      </div>

      {this.state.cardarray.map(function(item, i){
        return <Post key={i} {...item} />},this)}

    </div>
    );
  }
}

export default Blog;
