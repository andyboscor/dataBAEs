import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Post from './Post.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import 'whatwg-fetch';

var addBottom = {
  marginTop:'40px',
  marginBottom: '150px'
}

class Blog extends Component {

  state = {
    cardarray: [],
    open: false,
    blogID: '',
    post_content: '',
    post_title: ''
  }

  componentDidMount() {
    var self = this;
    fetch('http://friendzone.azurewebsites.net/API.php/blog/' + localStorage.getItem('userID'), {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }
    })
    .then(function(response) {
      return response.json()})
    .then(function(json) {
      var cardDatabase =json;

      self.setState({
        blogID: json.blogID})

      fetch('http://friendzone.azurewebsites.net/API.php/blog_posts/' + self.state.blogID, {
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred')
        }})
      .then(function(response) {
        return response.json()})
      .then(function(postObject) {
        var arr=[];
        for(let post in postObject) {
          var postAttributes = postObject[post];
          arr.unshift({
            postTitle: postAttributes.title,
            postContent: postAttributes.content
          });
        }

        self.setState({
          cardarray: arr
        });
      })
      .catch(function(ex) {
        console.log('parsing failed', ex)})
      })
      .catch(function(ex) {
        console.log('parsing failed', ex)
      });
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

  handleSubmit = () => {
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/blog_posts/' + self.state.blogID , {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: self.state.post_title,
          content: self.state.post_content
        })
      })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        self.state.cardarray.unshift({
          postTitle: self.state.post_title,
          postContent: self.state.post_content
        });
        self.setState({
          cardarray: self.state.cardarray,
          post_title: '',
          post_content: ''
        });
      }).catch(function(ex) {
        console.log('parsing failed', ex);
        // FIXME: Add handling errors.
      });
    this.handleClose();
  }

  handleCancel = () => {
    this.setState({
      post_title: '',
      post_content: ''
    });
    this.handleClose();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit.bind(this)}
      />,
    ];

    return (
    <div style={addBottom}>
      <div >
      <center>
        <FloatingActionButton onTouchTap={this.handleOpen} backgroundColor='#8088B0'>
          <ContentAdd/>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
          >

          <TextField
            hintText="Type anything"
            type="text"
            value={this.state.post_title}
            onChange={ (event) => { this.setState({ post_title: event.target.value });} }
            floatingLabelText="Post Title"
            fullWidth={true}
          />

          <TextField
            hintText="Type anything"
            type="text"
            value={this.state.post_content}
            onChange={ (event) => { this.setState({ post_content: event.target.value });} }
            floatingLabelText="Write Your Post Here"
            fullWidth={true}
          />

          </Dialog>
        </FloatingActionButton>
      </center>
      </div>
      {this.state.cardarray.map(function(item, i){
        return <Post key={i} {...item} />},this)}
    </div>
    );
  }
}

export default Blog;
