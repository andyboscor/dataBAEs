import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Post from './Post.js';
var addBottom = {
  marginBottom: '50px'
}
  var cardarray = [ {title:"This is my long ass post", message: "I don't think I'm into this whole Computer Science thing anymore. Writing code. What the hell was I thinking when I signed up for this. Like duuuh. But like it's cool tho. Look at me go I've already wasted so much time writing this when I could've handled the states."}, {title:"This is my long ass post", message:"  I don't think I'm into this whole Computer Science thing anymore. Writing code. What the hell was I thinking when I signed up for this. Like duuuh. But like it's cool tho. Look at me go I've already wasted so much time writing this when I could've handled the states."}, {title:'This is my long ass post', message:"  I don't think I'm into this whole Computer Science thing anymore. Writing code. What the hell was I thinking when I signed up for this. Like duuuh. But like it's cool tho. Look at me go I've already wasted so much time writing this when I couldve handled the states and some other shit."}];
class Blog extends Component {


  render() {

    return (
    <div style={addBottom}>
    {
      cardarray.map(function(item, i){
          return <Post key={i} {...item} />
        },this)}
      </div>
    );
  }
}

export default Blog;
