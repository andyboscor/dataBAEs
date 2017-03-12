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
    this.state = {
      list: [],
      exista: false, chat_id: '',
      to_circle: false
    };

    this.handleResponse = this.handleResponse.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }
  componentDidMount(){
    if(this.props.isAdmin===true)
    chatStyle = {
      display:'flex',
      flexDirection: 'row',
      overflowY:'scroll',
      height: window.innerHeight - 64,
      width:'100%'
    };
    else chatStyle = {
            display:'flex',
            flexDirection: 'row',
            overflowY:'scroll',
            height: window.innerHeight - 112,
            width:'100%'
          };
  }
  handleResponse(data, to_circle) {

    this.setState({chat_id: data});
    var send_to = '';
    if(to_circle === true)
    {
      send_to = "to_circle/";
      this.setState({to_circle: true});
    }
    else {
      send_to = "to_user/";
      this.setState({to_circle: false});}

    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/messages/' + send_to + data , {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      }
    })
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      //console.log('parsed json', json)
      var results = [];
      json.map(function(item,i)
      {
        results.push({
          message: item.message_content,
          sender_name: item.sender_name,
          picture: ("https://friendzone.azurewebsites.net/" + item.picture)
        });
      });
      self.setState({
        list:results,
        exista: true
      });
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }
  handleSend(data, to_circle){
    var send_to = '';

    if(to_circle === true) send_to = "to_circle";
    else send_to = "to_user";

    var payload = {};
    payload[send_to] = this.state.chat_id;
    payload["message_content"] = data;
    var self = this;
    fetch('https://friendzone.azurewebsites.net/API.php/messages' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('usercred')
      },
      body: JSON.stringify(payload)
    })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        //console.log('parsed json', json)
        if(to_circle === false)
        self.handleResponse(self.state.chat_id, false);
        else self.handleResponse(self.state.chat_id, true);
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
