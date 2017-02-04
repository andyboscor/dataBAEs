import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Post from './Post.js';
import 'whatwg-fetch';
var addBottom = {
  marginBottom: '50px'
}

  var cardarray1 = [ {title:"This is my long ass post", message: "I don't think I'm into this whole Computer Science thing anymore. Writing code. What the hell was I thinking when I signed up for this. Like duuuh. But like it's cool tho. Look at me go I've already wasted so much time writing this when I could've handled the states."}, {title:"This is my long ass post", message:"  I don't think I'm into this whole Computer Science thing anymore. Writing code. What the hell was I thinking when I signed up for this. Like duuuh. But like it's cool tho. Look at me go I've already wasted so much time writing this when I could've handled the states."}, {title:'This is my long ass post', message:"  I don't think I'm into this whole Computer Science thing anymore. Writing code. What the hell was I thinking when I signed up for this. Like duuuh. But like it's cool tho. Look at me go I've already wasted so much time writing this when I couldve handled the states and some other shit."}];



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
    }

  render() {

    return (
    <div style={addBottom}>
    {
      this.state.cardarray.map(function(item, i){
          return <Post key={i} {...item} />
        },this)}
      </div>
    );
  }
}

export default Blog;
