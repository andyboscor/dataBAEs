import React, {Component} from 'react';
import Post from './Post.js';
import 'whatwg-fetch';

var addBottom = {
  marginBottom: '50px'
}

//var postarray= [{title:'Cheeseburgers', message:'Fat cat here yo'}, {title:'Yaaaas', message:'Here is this shiz'}];

class OtherBlog extends Component {

  state = {
    cardarray: [],
    friendblogID: '',
    blog_title: ''
  }
  componentDidMount() {
    var self = this;
    fetch('http://friendzone.azurewebsites.net/API.php/blog/'+ self.props.friendID, {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }
    })
    .then(function(response) {
      return response.json()})
    .then(function(json) {
      var cardDatabase =json;
      self.setState({
        friendblogID: json.blogID,
        blog_title: json.blogName
      })

      fetch('http://friendzone.azurewebsites.net/API.php/blog_posts/' + self.state.friendblogID, {
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('usercred')
        }})
      .then(function(response) {
        return response.json()})
      .then(function(postObject) {
        var arr=[];
        for(let post in postObject) {
          var postAttributes = postObject[post];
          console.log('hellodjshf', postAttributes);
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
      })
  }

  render() {
    return (
    <div style={addBottom}>
    <center><h1>{this.state.blog_title}</h1></center>
    {
      this.state.cardarray.map(function(item, i){
          return <Post key={i} {...item} />
        },this)}
      </div>
    );
  }
}

export default OtherBlog;
