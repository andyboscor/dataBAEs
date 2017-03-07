import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Post from './Post.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Create from 'material-ui/svg-icons/content/create';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
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
    blogTitle: '',
    post_content: '',
    post_title: '',
    editTitle: false
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
      self.setState({
        blogID: json.blogID,
        blog_title: json.blogName
      })

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
            postID: postAttributes.postID,
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
          postID: json.toString(),
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

  handleDeletePost(postID) {
    let postToDelete;
    for(let post of this.state.cardarray) {
      if(post.postID === postID) {
        postToDelete= post;
        break;
      }
    }
    if(!postToDelete) {
      return;
    }
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/blog_posts', {
        method: 'DELETE',
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postID: postID
        })
      })
      .then(function(response) {
        let index = self.state.cardarray.indexOf(postToDelete);
        self.state.cardarray.splice(index, 1);
        self.setState({
          cardarray: self.state.cardarray
        });
      }).catch(function(ex) {
        // FIXME: Add handling errors.
        console.log('parsing failed', ex)
        return;
      });
  }

  sendUpdatedTitle() {
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/blog' , {
        method: 'PUT',
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          blogName: self.state.blog_title
        })
      })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        self.setState({
          blog_title: self.state.blog_title
        });
      }).catch(function(ex) {
        console.log('parsing failed', ex);
        // FIXME: Add handling errors.
      });
  }

  async submitNewTitle() {
    if (this.state.editTitle) {
      await this.sendUpdatedTitle();
    }
    this.setState({ editTitle: !this.state.editTitle });
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

    let posts = [];
    for(let post of this.state.cardarray) {
      posts.push(<Post key={post.postID} postID={post.postID} deleteFunction={this.handleDeletePost.bind(this)} {...post} />);
    }

    let blogTitle;
    let editButton = (
      <IconButton onTouchTap={this.submitNewTitle.bind(this)} tooltip="Edit title" touch={true} tooltipPosition="bottom-right">
        <Create />
        </IconButton>);
    if(!this.state.editTitle) {
      blogTitle = (
        <div>
          <h1 style={{ display: 'inline-block' }}>{this.state.blog_title}</h1>
          {editButton}
          <br/>
        </div>);
    } else {
      blogTitle = (
        <form onSubmit={this.submitNewTitle.bind(this)}>
          <TextField
            hintText="Blog Title"
            onChange={(e) => { this.setState({ blog_title: e.target.value }) }}
            value={this.state.blog_title}
            style={{ marginBottom: '10px' }}
            id="text-field-title"
          />
          {editButton}
          <br />
        </form>
      );
    }

    return (
    <div style={addBottom}>
      <div >
      <center>
        {blogTitle}
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
      {posts}
    </div>
    );
  }
}

export default Blog;
