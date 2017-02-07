import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import OtherPost from './OtherPost.js';
import 'whatwg-fetch';
var addBottom = {
  marginBottom: '50px'
}

var postarray= [{title:'Cheeseburgers', message:'Fat cat here yo'}, {title:'Yaaaas', message:'Here is this shiz'}];


class OtherBlog extends Component {

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
    self.setState({cardarray: postarray})
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
