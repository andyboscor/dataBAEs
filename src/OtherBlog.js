import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import OtherPost from './OtherPost.js';
import 'whatwg-fetch';

var addBottom = {
  marginBottom: '50px'
}

//var postarray= [{title:'Cheeseburgers', message:'Fat cat here yo'}, {title:'Yaaaas', message:'Here is this shiz'}];

class OtherBlog extends Component {

  state = {
    cardarray: []
  }
  componentDidMount() {
    var self = this;
    fetch('http://friendzone.azurewebsites.net/API.php/friends/'+ self.props.friendID, {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }
    })
    .then(function(response) {
      return response.json()})
    .then(function(json) {
      var cardDatabase =json;
      console.log('hellodjshf', self.props.friendID);

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
            postTitle: postAttributes.postID,
            postContent: postAttributes.blog_content
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
    {
      this.state.cardarray.map(function(item, i){
          return <OtherPost key={i} {...item} />
        },this)}
      </div>
    );
  }
}

export default OtherBlog;
