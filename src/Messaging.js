import React, {Component} from 'react';
import Chat from './Chat.js';
import ChatList from './ChatList.js';

var chatStyle = {
  display:'flex',
  flexDirection: 'row',
  overflowY:'scroll',
  height: window.innerHeight - 112,
  width:'100%'
};

class Messaging extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [], exista: false, chat_id: ''};

    // This binding is necessary to make `this` work in the callback
    this.handleResponse = this.handleResponse.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }
  handleResponse(data) {
  //var messagearray = [ {firstname:'Nemo', message:'this', photo:'this'},{firstname:'Hello', message:'this sss', photo:'this'}, {firstname:'jeee', message:'this sss', photo:'this'}];
  this.setState({chat_id: data});
  var self = this;
  fetch('https://friendzone.azurewebsites.net/API.php/messages/to_user/' + data , {
    headers: {
  'Authorization': 'Basic ' + localStorage.getItem('usercred')
}
  })
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json)
      var results = [];
      json.map(function(item,i)
      {
        results.push({message:item.message_content, sender_name:item.sender_name});
    });
    console.log("here");
    self.setState({
      list:results,
      exista: true
    });
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }
  handleSend(data){
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/messages' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      },
      body: JSON.stringify({
       to_user: self.state.chat_id,
       message_content: data,
      })
    })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        console.log('parsed json', json)
        self.handleResponse(self.state.chat_id);
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }
  renderConditionala(){
    if(this.state.exista===true)
      return(
        <Chat {...this.state} handleSend={this.handleSend}/>
      );
  }

  render() {

    return (

        <div style={chatStyle}>
          <ChatList handleResponse={this.handleResponse} />
          {this.renderConditionala()}

        </div>


    );
  }
}

export default Messaging;
