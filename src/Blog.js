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
    dataSource: [],
    cardarray: [],
    open: false,
    blogID: ''
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
          arr.push({
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
      })
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

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
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
            dataSource={this.state.dataSource}
            onUpdateInput={this.handleUpdateInput}
            floatingLabelText="Blog Title"
            fullWidth={true}
          />

          <TextField
            hintText="Type anything"
            dataSource={this.state.dataSource}
            onUpdateInput={this.handleUpdateInput}
            floatingLabelText="Write Your blog here"
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
